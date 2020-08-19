
-- psql mixnmatch -f sql/db.sql
--sudo service postgresql start

DROP TABLE IF EXISTS items;

CREATE TABLE items(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    path VARCHAR(255),
    category VARCHAR(255),
);

INSERT INTO items (name, path, category) VALUES (
    '1-seater',
    '/images/1seater.png',
    'sofas'
);

INSERT INTO items (name, path, category) VALUES (
    'pillow',
    '/images/pillow.png',
    'misc'
);

INSERT INTO items (name, path, category) VALUES (
    '2-seater',
    '/images/2seatere.png',
    'couches'
);