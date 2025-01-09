import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {type: String, require:true},
    lastName: {type:String,require:true},
    dateOfBirth: {type:Date,require:true},
    email: {type:String,require:true},
    password: {type:String,require:true},
});

export default mongoose.model("User",userSchema);