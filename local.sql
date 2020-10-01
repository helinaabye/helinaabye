DROP DATABASE IF EXISTS blogsie;
CREATE DATABASE blogsie;
\c blogsie

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT,
  admin boolean
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT,
  time timestamp,
  public boolean,
  user_id integer REFERENCES users(id) ON DELETE CASCADE
);
