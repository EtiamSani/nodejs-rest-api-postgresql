CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  inventory_status TEXT,
  category TEXT,
  image TEXT,
  rating INTEGER,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'user'))
);
