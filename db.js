const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/mixnmatch"
);

module.exports.getLager = () => {
    return db.query("SELECT * FROM items");
};

module.exports.getPatterns = () => {
    return db.query("SELECT * FROM patterns ORDER BY id DESC");
};
//module.exports.getPatterns = () => {
//    return db.query("SELECT * FROM patterns FULL OUTER JOIN temp");
//};

module.exports.addImage = (name, path, category) => {
    let q = "INSERT INTO patterns (name, path, category) VALUES($1, $2, $3)";
    let params = [name, path, category];
    //console.log("params: ", params);
    return db.query(q, params);
};

module.exports.addToTemp = (name, path, category) => {
    let q =
        "INSERT INTO temp (name, path, category) VALUES($1, $2, $3) RETURNING *";
    let params = [name, path, category];
    //console.log("params: ", params);
    return db.query(q, params);
};

module.exports.displayTemp = () => {
    const q = "SELECT * FROM temp ORDER BY id DESC LIMIT 1";

    return db.query(q);
};

module.exports.clearTemp = () => {
    return db.query("DELETE FROM temp");
};
