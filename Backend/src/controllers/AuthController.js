import User from "../models/Users.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "Please fill in all fields" });
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user._id);

        res.status(200).json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.log("Error in login route:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const registerUser = async (req, res) => {
    try {
       const { email, username, password } = req.body;

       if (!email || !username || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
       }

       
       if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
       }


       if (username.length < 3) {
        return res.status(400).json({ message: "Username must be at least 3 characters" });
       }

       //Check if email is already in use
       const existingUser = await User.findOne({ email });
       if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
       }

       //Check if username is already in use
       const existingUsername = await User.findOne({ username });
       if (existingUsername) {
        return res.status(400).json({ message: "Username already in use" });
       }

       //Create new user if all checks are passed
       const user = new User({
        email,
        username,
        password
       })

       await user.save();

       const token = generateToken(user._id);

       res.status(201).json({
        token,
        user:{
            _id: user._id,
            username: user.username,
            email: user.email
        }
    });   
    } catch (error) {
        console.log("Error in register route:", error);
        res.status(500).json({ message: "Internal Server error" });
    }   
};

//Gather user details for profile screen
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.json(user);

    } catch (error) {
        console.log("Error in getUserById route:", error);
        res.status(500).json({ message: "Internal Server error" })
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = req.user.id;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email
                },
            },
            { new: true }
        );

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.user.id

        const deleteUser = await User.findByIdAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!deleteUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server error"});
    }
};
