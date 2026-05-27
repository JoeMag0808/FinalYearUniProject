import jwt from "jsonwebtoken";

//Middleware authenticating requestd with JWT tokens
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    try {
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { id: decoded.userId };

        next();
    }   catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};