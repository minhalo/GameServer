import express from "express";
import authController from "../controllers/authController";

let router = express.Router();

let authRoute = (app) => {
    router.get('/auth/test', authController.test);
    router.post('/auth/register', authController.register);
    router.post('/auth/login', authController.login);
    router.patch('/auth/refreshTK', authController.refreshTK);

    return app.use("/", router)
}

export default authRoute;
