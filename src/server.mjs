import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import mysql from "mysql2";
import {router} from "./router.mjs";

export {conn};

dotenv.config();

const server = express();
server.listen(process.env.PORT, function(){
    console.log("Listening.");
});

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
server.use("/js", express.static("js"));
server.use("/css", express.static("css"));
server.use("/images", express.static("images"));
server.use(router);