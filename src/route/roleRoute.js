import express from "express";
import roleController from "../controllers/roleController";

let router = express.Router();

let roleRoute = (app) => {
    router.get('/general/role', roleController.getRole);
    router.put('/general/role', roleController.setRole);
    router.post('/general/role', roleController.createRole);
    router.delete('/general/role', roleController.deleteRole);
    return app.use("/", router)
}

export default roleRoute;
