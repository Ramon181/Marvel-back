const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");
const path = require("path");
const morgan = require("morgan");
const multer = require("multer")
const uuid = require("uuid")

const server = express();

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
const storage = multer.diskStorage({
    destination: path.join(__dirname, "public/img/uploads"),
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });
server.use(upload.array("images"));
server.use(express.static(path.join(__dirname,"public")))
server.use("/", router);


module.exports = server;