import express from "express";
import testController from "../controllers/testController";

let router = express.Router();

let testRoute = (app) => {
    router.get('/test/testCaseA', testController.testCaseA);
    router.get('/test/testCaseB', testController.testCaseB);
    router.post('/test/testCaseC', testController.testCaseC);
    return app.use("/", router)
}

export default testRoute;

