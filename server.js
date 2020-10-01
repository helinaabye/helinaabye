const express = require("express");
const cors = require('cors');
const { pool } = require('./config');
const jwt = require('jsonwebtoken');
const secret = 'abcdefgh'
const path = require('path');

const port = process.env.PORT || 3005;
var app = express();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

const createToken = (username) => (
  jwt.sign(
    {username},
    secret,
    {expiresIn: '24h'}
  )
)

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  token = token && token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
}

app.get("/users", (req, res, next) => {
  let query = 'SELECT id, username, admin FROM users';
  let params = [];
  if (req.query.username && req.query.password) {
    query += ` WHERE username=$1 AND password=$2`;
    params = [req.query.username, req.query.password];
  }
  pool.query(query, params, (error, results) => {
    if (error) {
      throw error
    }
    if (params.length) {
      res.status(200).json({
        results: results.rows, 
        token: createToken(params[0])
      });
    } else {
      res.status(200).json(results.rows);
    }
  })
});

app.post("/users", (req, res, next) => {
  const { username, password } = req.body;
  let { admin } = req.body;

  pool.query('SELECT id FROM users WHERE admin=true', (error, results) => {
    if (error) { throw error }
    if (results.rowCount == 0) { admin = true }
    pool.query('INSERT INTO users (username, password, admin) VALUES ($1, $2, $3) RETURNING id, username, admin', [username, password, !!admin], (error, results) => {
      if (error) {
        throw error
      }
      if (results.rowCount == 1)
        res.status(201).json({
          results: results.rows[0], 
          token: createToken(username)
        });
      else 
        res.status(500).json({errorMessages:[
          `Something went wrong, insert returned ${results.rowCount} results.`
        ]});
    })
  })
});

app.get("/users/:id", (req, res, next) => {
  const { id } = req.params;

  pool.query('SELECT id, username, admin FROM users WHERE id=$1', [id], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rowCount == 1)
      res.status(200).json(results.rows[0]);
    else if (results.rowCount == 0)
      res.status(404).json({errorMessages:[
        `Data not found, select returned no results.`
      ]});
    else 
      res.status(500).json({errorMessages:[
        `Something went wrong, select returned ${results.rowCount} results.`
      ]});
  })
});

app.put("/users/:id", (req, res, next) => {
  const { id } = req.params;
  const { username, password, admin } = req.body;

  pool.query('UPDATE users SET username=$2, password=$3, admin=$4 WHERE id=$1 RETURNING id, username, admin', [id, username, password, !!admin], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rowCount == 1)
      res.status(200).json(results.rows[0]);
    else if (results.rowCount == 0)
      res.status(404).json({errorMessages:[
        `Data not found, update returned no results.`
      ]});
    else 
      res.status(500).json({errorMessages:[
        `Something went wrong, update returned ${results.rowCount} results.`
      ]});
  })
});

app.delete("/users/:id", (req, res, next) => {
  const { id } = req.params;

  pool.query('DELETE FROM users WHERE id=$1 RETURNING id, username, admin', [id], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rowCount == 1)
      res.status(200).json(results.rows[0]);
    else if (results.rowCount == 0)
      res.status(404).json({errorMessages:[
        `Data not found, delete returned no results.`
      ]});
    else 
      res.status(500).json({errorMessages:[
        `Something went wrong, delete returned ${results.rowCount} results.`
      ]});
  });
})

app.post("/users/:id/token", checkToken, (req, res, next) => {
  const { id } = req.params;
  pool.query('SELECT id FROM users WHERE id=$1', [id], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rowCount == 1) res.status(200).json({
      success: true,
      message: 'Token is still valid'
    });
    else res.status(401).json({
      success: false,
      message: 'User is not valid'
    })
  })
})

app.get("/users/:user_id/posts", checkToken, (req, res, next) => {
  const { user_id } = req.params;
  pool.query(`
    SELECT id, title, content, time, user_id, public 
    FROM posts WHERE user_id=$1 
    ORDER BY time DESC
    `, [user_id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
});

app.post("/users/:user_id/posts", checkToken, (req, res, next) => {
  const { user_id } = req.params;
  const { title, content, time, public } = req.body;

  pool.query(`
    INSERT INTO posts (title, content, time, user_id, public) 
    VALUES ($1, $2, to_timestamp($3), $4, $5) 
    RETURNING id, title, content, time, public
    `, [title, content, time/1000.0, user_id, !!public], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rowCount == 1)
      res.status(201).json(results.rows[0]);
    else 
      res.status(500).json({errorMessages:[
        `Something went wrong, insert returned ${results.rowCount} results.`
      ]});
  })
});

app.get("/users/:user_id/posts/:id", checkToken, (req, res, next) => {
  const { user_id, id } = req.params;

  pool.query(`
    SELECT id, title, content, time, user_id, public
    FROM posts WHERE user_id=$1 AND id=$2
    `, [user_id, id], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rowCount == 1)
      res.status(200).json(results.rows[0]);
    else if (results.rowCount == 0)
      res.status(404).json({errorMessages:[
        `Data not found, select returned no results.`
      ]});
    else 
      res.status(500).json({errorMessages:[
        `Something went wrong, select returned ${results.rowCount} results.`
      ]});
  })
});

app.put("/users/:user_id/posts/:id", checkToken, (req, res, next) => {
  const { user_id, id } = req.params;
  const { title, content, time, public } = req.body;

  pool.query(`
    UPDATE posts SET title=$3, content=$4, time=to_timestamp($5), public=$6 
    WHERE user_id=$1 AND id=$2 
    RETURNING id, title, content, time, public
    `, [user_id, id, title, content, time/1000.0, !!public], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rowCount == 1)
      res.status(200).json(results.rows[0]);
    else if (results.rowCount == 0)
      res.status(404).json({errorMessages:[
        `Data not found, update returned no results.`
      ]});
    else 
      res.status(500).json({errorMessages:[
        `Something went wrong, update returned ${results.rowCount} results.`
      ]});
  })
});

app.delete("/users/:user_id/posts/:id", checkToken, (req, res, next) => {
  const { user_id, id } = req.params;

  pool.query('DELETE FROM posts WHERE user_id=$1 AND id=$2 RETURNING id, title, content, time', [user_id, id], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rowCount == 1)
      res.status(200).json(results.rows[0]);
    else if (results.rowCount == 0)
      res.status(404).json({errorMessages:[
        `Data not found, delete returned no results.`
      ]});
    else 
      res.status(500).json({errorMessages:[
        `Something went wrong, delete returned ${results.rowCount} results.`
      ]});
  })
});

app.get("/posts", (req, res, next) => {
  pool.query(`
    SELECT posts.id, posts.title, posts.content, posts.time, posts.user_id, users.username 
    FROM posts LEFT JOIN users ON posts.user_id=users.id 
    WHERE posts.public=true
    ORDER BY time DESC
    `, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
});

app.get("/posts/:id", (req, res, next) => {
  const { id } = req.params;

  pool.query(`
    SELECT posts.id, posts.title, posts.content, posts.time, posts.user_id, users.username 
    FROM posts LEFT JOIN users ON posts.user_id=users.id 
    WHERE posts.id=$1 AND posts.public=true 
    ORDER BY time DESC
    `, [id], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rowCount == 1)
      res.status(200).json(results.rows[0]);
    else if (results.rowCount == 0)
      res.status(404).json({errorMessages:[
        `Data not found, select returned no results.`
      ]});
    else 
      res.status(500).json({errorMessages:[
        `Something went wrong, select returned ${results.rowCount} results.`
      ]});
  })
});

app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')));