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

module.exports.addImage = (name, path) => {
    let q = "INSERT INTO patterns (name, path) VALUES($1, $2)";
    let params = [name, path];
    console.log("params: ", params);
    return db.query(q, params);
};
