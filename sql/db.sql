
-- psql mixnmatch -f sql/db.sql
--sudo service postgresql start

DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS patterns CASCADE;


CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    path VARCHAR(255),
    category VARCHAR(255)
);

CREATE TABLE patterns(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    path VARCHAR(255),
    category VARCHAR NOT NULL
);

