import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "../config/viewEngine";
import routes from "../route/authIndex"
import connectDB from "../config/connectDB";
import cors from 'cors'
import https from 'https'
import pem from "https-pem"


require('dotenv').config();

let app = express();

app.use(cors())
// app.use(cors({origin: false}));
// app.options('*', cors())


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:8081');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Methods', 'Content-Type', 'Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//config app
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

configViewEngine(app);
routes.authInitWebRoute(app);
connectDB();

let port = process.env.AUTHPORT || 8500;

var options = {
    key: pem.key,
    cert: pem.cert
};

https.createServer(options, app).listen(port, function () {
    console.log("Server listening on port: " + port);
    console.log("Server using Https proxy");
    console.log("Domain: https://localhost:" + port);
});

