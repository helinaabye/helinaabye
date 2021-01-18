const express = require("express");
const cors = require('cors');
const { pool } = require('./config');
const path = require('path');

const port = process.env.PORT || 3005;
var app = express();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(express.static('build'));
app.use(express.json());
app.use(cors());


app.get("/requests", (req, res, next) => {

  pool.query(`
    SELECT id, type, name, email, message, date
    FROM requests 
    ORDER BY id DESC
    `, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
});

app.post("/requests", (req, res, next) => {
  const { type, name, email, message } = req.body;

  pool.query(`
    INSERT INTO requests (type, name, email, message) 
    VALUES ($1, $2, $3, $4) 
    RETURNING id, type, name, email, message
    `, [type, name, email, message], (error, results) => {
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

app.get("/requests/:id", (req, res, next) => {
  const { id } = req.params;

  pool.query(`
    SELECT id, type, name, email, message, date
    FROM requests WHERE id=$1
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

app.put("/requests/:id", (req, res, next) => {
  const { id } = req.params;
  const { type, name, email, message, date } = req.body;

  pool.query(`
    UPDATE requests SET type=$2, name=$3, email=$4, message=$5, date=to_timestamp($6)
    WHERE id=$1
    RETURNING id, type, name, email, message, date
    `, [id, type, name, email, message, date/1000.0], (error, results) => {
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

app.delete("/requests/:id", (req, res, next) => {
  const { uid } = req.params;

  pool.query('DELETE FROM requests WHERE id=$1 RETURNING id, type, name, email, message, date', [id], (error, results) => {
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


app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')));