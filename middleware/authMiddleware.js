// authMiddleware.js

const authMiddleware = (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    // Check if user is a superadmin
    if (req.user.role !== 'superadmin') {
        return res.status(403).json({ message: 'Forbidden: Only superadmins are allowed to perform this operation' });
    }

    // User is authorized, proceed to the next middleware
    next();
};

module.exports = authMiddleware;
