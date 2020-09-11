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

module.exports.addImage = (name, path, category) => {
    let q = "INSERT INTO patterns (name, path, category) VALUES($1, $2, $3)";
    let params = [name, path, category];
    return db.query(q, params);
};

module.exports.addTemp = (name, path, category) => {
    let q =
        "INSERT INTO patterns (name, path, category, temp) VALUES($1, $2, $3, $4) RETURNING *";
    let params = [name, path, category, true];
    return db.query(q, params);
};

module.exports.clearTemp = () => {
    return db.query("DELETE FROM patterns WHERE temp=true");
};
