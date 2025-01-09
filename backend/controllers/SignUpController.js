import User from "../models/User";
import bcrypt from "bcrypt";

const registerUser = async (req,res) =>{
    const {firstName, lastName, dateOfBirth, email, password} = req.body;

    if(!firstName||!lastName||!dateOfBirth||!email||!password){
        return res.status(400).json("Couldn't find complete user data");
    }

    const salt = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password,salt);

    const user = new User({
        firstName,
        lastName,
        dateOfBirth,
        email,
        password:hashedPassword
    });

    await user.save();

    return res.status(200).json("User registered successfully!");
}

export default registerUser;