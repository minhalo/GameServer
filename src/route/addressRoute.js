import express from "express";
import addressController from "../controllers/addressController";
import adminCheckout from "../middleware/adminMiddleMan"
import rateLimit from '../config/rateLimit'

let router = express.Router();

let addressRoute = (app) => {
    router.get('/general/address', rateLimit.userLimiter, adminCheckout.adminFireWallheader, addressController.getAddress);
    router.put('/general/address', rateLimit.userLimiter, adminCheckout.adminFireWallheader, addressController.setAddress);
    router.post('/general/address', rateLimit.userLimiter, adminCheckout.adminFireWallheader, addressController.createAddress);
    router.delete('/general/address', rateLimit.userLimiter, adminCheckout.adminFireWallheader, addressController.deleteAddress);
    return app.use("/", router)
}

export default addressRoute;
