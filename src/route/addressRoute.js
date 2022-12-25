import express from "express";
import addressController from "../controllers/addressController";
import adminCheckout from "../middleware/adminMiddleMan"

let router = express.Router();

let addressRoute = (app) => {
    router.get('/general/address', addressController.getAddress);
    router.put('/general/address', adminCheckout.adminFireWallbody, addressController.setAddress);
    router.post('/general/address', adminCheckout.adminFireWallbody, addressController.createAddress);
    router.delete('/general/address', adminCheckout.adminFireWallheader, addressController.deleteAddress);
    return app.use("/", router)
}

export default addressRoute;
