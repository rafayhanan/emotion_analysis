import User from "../models/User";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
    const { firstName, lastName, dateOfBirth, email, password } = req.body;

    if (!firstName || !lastName || !dateOfBirth || !email || !password) {
        return res.status(400).json({ message: "Incomplete user data" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            firstName,
            lastName,
            dateOfBirth,
            email,
            password: hashedPassword,
        });

        await user.save();

        return res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default registerUser;