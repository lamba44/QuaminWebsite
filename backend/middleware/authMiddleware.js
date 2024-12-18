const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET; // Access the secret key from .env

exports.verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res
            .status(403)
            .json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Verifies the JWT using the secret
        req.adminId = decoded.id; // Decodes and adds the admin ID to the request
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
