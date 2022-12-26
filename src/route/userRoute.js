import express from "express";
import userController from "../controllers/userController";
import userCheckout from "../middleware/userMiddleMan"
import rateLimit from '../config/rateLimit'

let router = express.Router();

let userRoute = (app) => {
    router.get('/profile/me', rateLimit.userLimiter, userCheckout.userFireWallheader, userController.me);
    return app.use("/", router)
}

export default userRoute;


