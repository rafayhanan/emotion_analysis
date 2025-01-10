import bcrypt from 'bcrypt';
import User from '../models/User';
import jwt from "jsonwebtoken";

const loginUser = async (req,res)=>{
    const {email,password} = req.body;

    if(!email||!password){
        return res.status(400).json({message:"No email or password"});
    }

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"No user with given email exists"});
        }
        const matchPassword = await bcrypt.compare(password,user.password);
        if(!matchPassword){
            return res.status(400).json({message:"Incorrect Password"});
        }
        const {firstName,lastName,dateOfBirth,_id} = user;
        const token = jwt.sign(
            {userID: user._id,firstName,lastName,email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: { firstName, lastName, email, dateOfBirth, _id },
        });

    }
    catch(err){
        return res.status(500).json({message:`Internal Server Error: ${err.message}`});
    }

}

export default loginUser;

