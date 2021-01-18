DROP TABLE IF EXISTS requests;

CREATE TABLE requests (
  id SERIAL PRIMARY KEY,
  type TEXT,
  name TEXT,
  email TEXT,
  message TEXT,
  date timestamp
)