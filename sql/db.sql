
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

DROP TABLE IF EXISTS patterns CASCADE;
CREATE TABLE patterns(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    category VARCHAR NOT NULL
);

DROP TABLE IF EXISTS temp CASCADE;
CREATE TABLE temp(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    category VARCHAR NOT NULL
    --FOREIGN KEY (id) REFERENCES patterns (id)
);

