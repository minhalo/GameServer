import express from "express";
import addressController from "../controllers/addressController";

let router = express.Router();

let addressRoute = (app) => {
    router.get('/general/address', addressController.getAddress);
    router.put('/general/address', addressController.setAddress);
    router.post('/general/address', addressController.createAddress);
    router.delete('/general/address', addressController.deleteAddress);
    return app.use("/", router)
}

export default addressRoute;
