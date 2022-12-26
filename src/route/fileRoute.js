import express from "express";
import fileController from "../controllers/fileController";



let router = express.Router();

let fileRoute = (app) => {
    router.get('/img/avatarDefault/:gender', fileController.avatarDefault);
    return app.use("/", router)
}

export default fileRoute;

