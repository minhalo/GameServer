import express from "express";
import genderController from "../controllers/genderController";

let router = express.Router();

let genderRoute = (app) => {
  router.get('/general/gender', genderController.getGender);
  router.put('/general/gender', genderController.setGender);
  router.post('/general/gender', genderController.createGender);
  router.delete('/general/gender', genderController.deleteGender);
  return app.use("/", router)
}

export default genderRoute;
