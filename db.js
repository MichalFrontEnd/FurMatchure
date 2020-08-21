const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/mixnmatch"
);

module.exports.getLager = () => {
    return db.query("SELECT * FROM items");
};

module.exports.getPatterns = () => {
    return db.query("SELECT * FROM patterns");
};
