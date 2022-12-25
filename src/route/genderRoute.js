import express from "express";
import genderController from "../controllers/genderController";
import adminCheckout from "../middleware/adminMiddleMan"

let router = express.Router();

let genderRoute = (app) => {
  router.get('/general/gender', genderController.getGender);
  router.put('/general/gender', adminCheckout.adminFireWallbody, genderController.setGender);
  router.post('/general/gender', adminCheckout.adminFireWallbody, genderController.createGender);
  router.delete('/general/gender', adminCheckout.adminFireWallheader, genderController.deleteGender);
  return app.use("/", router)
}

export default genderRoute;
