const express = require("express");
const app = express();
const compression = require("compression");
const s3 = require("./s3");
const { s3Url } = require("./config");
const db = require("./db");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

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
    db.getLager()
        .then(({ rows }) => {
            res.json({ rows });
        })
        .catch((err) => {
            console.log("error in getLager", err);
        });
});
app.get("/getpatterns", (req, res) => {
    db.getPatterns()
        .then(({ rows }) => {
            res.json({ rows });
        })
        .catch((err) => {
            console.log("error in getPatterns", err);
        });
});

app.post("/photoupld/:name", uploader.single("file"), s3.upload, (req, res) => {
    const { filename } = req.file;
    const url = s3Url + filename;
    req.file.path = url;
    const { name, category } = req.body;
    if (!name) {
        res.json({ error: true });
    } else {
        if (req.params.name == "regUpload") {
            db.addImage(name, url, category)
                .then((results) => {
                    res.json(results.rows[0]);
                })
                .catch((err) => {
                    console.log("error in photoupld :", err);
                });
        } else {
            db.addTemp(name, url, category, true)
                .then((results) => {
                    res.json(results.rows[0]);
                })
                .catch((err) => {
                    console.log("error in photoupld :", err);
                });
        }
    }
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

server.listen(8080, function () {
    console.log("Polkadots and rainbows");
});

io.on("connection", function (socket) {
    socket.on("disconnect", function () {
        db.clearTemp(() => {}).catch((err) => {
            console.log("error clearing temp", err);
        });
    });
});
