import express from "express";
import registerUser from "../controllers/SignUpController";


const userRouter = express.Router();

userRouter.post("/register",registerUser);

export default userRouter;