import { Router } from "express";
import UserController from "../controllers/user_controller.js";

const userouter = Router();

userouter.post("/",  UserController.createUser);

export default userouter;
