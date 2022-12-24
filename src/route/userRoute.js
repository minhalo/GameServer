import express from "express";
import userController from "../controllers/userController";


let router = express.Router();

let userRoute = (app) => {
    router.get('/test', userController.test2);
    return app.use("/", router)
}

export default userRoute;


