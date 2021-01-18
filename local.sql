DROP DATABASE IF EXISTS helinaabye;
CREATE DATABASE helinaabye;
\c helinaabye

CREATE TABLE requests (
  id SERIAL PRIMARY KEY,
  type TEXT,
  name TEXT,
  email TEXT,
  message TEXT,
  date timestamp default current_timestamp
);
