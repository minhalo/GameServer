import express from "express";
import userController from "../controllers/userController";
import adminCheckout from "../middleware/adminMiddleMan"
import rateLimit from '../config/rateLimit'

let router = express.Router();

let userRoute = (app) => {
    router.get('/profile/me', rateLimit.userLimiter, adminCheckout.adminFireWallheader, userController.me);
    return app.use("/", router)
}

export default userRoute;


