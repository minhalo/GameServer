import express from "express";
import roleController from "../controllers/roleController";
import adminCheckout from "../middleware/adminMiddleMan"
import rateLimit from '../config/rateLimit'

let router = express.Router();

let roleRoute = (app) => {
    router.get('/general/role', rateLimit.userLimiter, adminCheckout.adminFireWallheader, roleController.getRole);
    router.put('/general/role', rateLimit.userLimiter, adminCheckout.adminFireWallbody, roleController.setRole);
    router.post('/general/role', rateLimit.userLimiter, adminCheckout.adminFireWallbody, roleController.createRole);
    router.delete('/general/role', rateLimit.userLimiter, adminCheckout.adminFireWallheader, roleController.deleteRole);
    return app.use("/", router)
}

export default roleRoute;
