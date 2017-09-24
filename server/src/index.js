'use strict';

import expressValidation from "express-validation";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import express from "express";
import winston from "winston";
import helmet from "helmet";
import csurf from "csurf";
import cors from "cors";
import path from "path";


const app = express();

const rootUrl = "/api/";

app.use(cors({ origin: true, credentials: true }));

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.disable("x-powered-by");

app.use(csurf({ cookie: true }));

app.get("/", (req, res) => { 
    //console.log(path.resolve("../client/src/index.html"));
    res.sendFile(path.resolve("../client/src/index.html")); 
});
app.use('/assets',express.static(path.resolve("../client/dist/assets")));
app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        const unifiedErrorMessage = err.errors
            .map(error => error.messages.join(". "))
            .join(" and ");

        return res.status(err.status).json({
            message: unifiedErrorMessage
        });
    }
});

app.use((req, res) => {
    res.status(404).json({
        status: 404,
        message:
        "The requested URL " + req.originalUrl + " was not found on the server."
    });
});


const router = express.Router();

const port = 3001;
let server = app.listen(port, (err) => {
    server.address().port;

    if (err) {
        console.error('Something bad happened', err);
    } else {

    }

    console.info(`Server is listening on ${port}`);
});

export default server;