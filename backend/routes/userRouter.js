import express from "express";
import registerUser from "../controllers/SignUpController";
import loginUser from "../controllers/LoginController";

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);

export default userRouter;