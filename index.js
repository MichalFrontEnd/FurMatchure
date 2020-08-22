const express = require("express");
const app = express();
const compression = require("compression");
const s3 = require("./s3");
const { s3Url } = require("./config");
const db = require("./db");

app.use(compression());

app.use(express.static("./public"));

app.use(express.json());

///////FIle UPLOAD BOILERPLATE DON'T TOUCH!!//////
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
//////END BOILERPLATE///////////

/////bundle server
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

app.post("/photoupld", uploader.single("file"), s3.upload, (req, res) => {
    //console.log("is this working?");
    console.log("req.body: ", req.body);
    console.log("req.file in photoupld: ", req.file);
    const { filename } = req.file;
    const url = s3Url + filename;
    req.file.path = url;
    const { name, category } = req.body;
    //console.log("req.file.path after url switch: ", req.file);
    //res.json(req.file);
    db.addImage(name, url, category)
        .then((results) => {
            //console.log("results in photoupld: ", results.rows[0].url);
            res.json({ data: results.rows[0] });
        })
        .catch((err) => {
            console.log("error in photoupld :", err);
        });
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("Polkadots and rainbows");
});
