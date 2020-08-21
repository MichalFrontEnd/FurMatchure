const express = require("express");
const app = express();
const compression = require("compression");

const db = require("./db");

app.use(compression());

app.use(express.static("./public"));

app.use(express.json());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/getlager", (req, res) => {
    //console.log("route working");
    db.getLager()
        .then(({ rows }) => {
            //console.log("rows in getLager: ", rows);
            res.json({ rows });
        })
        .catch((err) => {
            console.log("error in getLager", err);
        });
});
app.get("/getpatterns", (req, res) => {
    //console.log("route working");
    db.getPatterns()
        .then(({ rows }) => {
            //console.log("rows in getLager: ", rows);
            res.json({ rows });
        })
        .catch((err) => {
            console.log("error in getPatterns", err);
        });
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("Polkadots and rainbows");
});
