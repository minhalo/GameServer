import express from "express";
import genderController from "../controllers/genderController";
import adminCheckout from "../middleware/adminMiddleMan"
import rateLimit from '../config/rateLimit'

let router = express.Router();

let genderRoute = (app) => {
  router.get('/general/gender', rateLimit.userLimiter, adminCheckout.adminFireWallheader, genderController.getGender);
  router.put('/general/gender', rateLimit.userLimiter, adminCheckout.adminFireWallheader, genderController.setGender);
  router.post('/general/gender', rateLimit.userLimiter, adminCheckout.adminFireWallheader, genderController.createGender);
  router.delete('/general/gender', rateLimit.userLimiter, adminCheckout.adminFireWallheader, genderController.deleteGender);
  return app.use("/", router)
}

export default genderRoute;
