import express from "express";
import authController from "../controllers/authController";
import rateLimit from '../config/rateLimit'

let router = express.Router();

let authRoute = (app) => {
    router.get('/auth/test', rateLimit.authLimiter, authController.test);
    router.post('/auth/register', rateLimit.authLimiter, authController.register);
    router.post('/auth/login', rateLimit.authLimiter, authController.login);
    router.patch('/auth/refreshTK', rateLimit.authLimiter, authController.refreshTK);
    router.get('/auth/activated/:gmail', rateLimit.authLimiter, authController.activated);

    return app.use("/", router)
}

export default authRoute;
