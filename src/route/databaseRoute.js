import express from "express";
import dbController from "../controllers/databaseController"

let router = express.Router();

let dbRoute = (app) => {

    router.delete('/drop', dbController.dbDrop);
    router.post('/create', dbController.dbCreate);

    return app.use("/", router)
}


export default dbRoute;
