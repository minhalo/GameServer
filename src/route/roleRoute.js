import express from "express";
import roleController from "../controllers/roleController";
import adminCheckout from "../middleware/adminMiddleMan"

let router = express.Router();

let roleRoute = (app) => {
    router.get('/general/role', roleController.getRole);
    router.put('/general/role', adminCheckout.adminFireWallbody, roleController.setRole);
    router.post('/general/role', adminCheckout.adminFireWallbody, roleController.createRole);
    router.delete('/general/role', adminCheckout.adminFireWallheader, roleController.deleteRole);
    return app.use("/", router)
}

export default roleRoute;
