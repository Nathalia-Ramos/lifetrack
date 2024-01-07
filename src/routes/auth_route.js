import { Router } from "express";
import AuthMiddleware from "../middlewares/auth_middleware.js";
import AuthController from "../controllers/auth_controller.js";

const authRouter = Router();

authRouter.post("/auth/", AuthMiddleware.validateAuthBody, AuthController.auth);

export default authRouter;