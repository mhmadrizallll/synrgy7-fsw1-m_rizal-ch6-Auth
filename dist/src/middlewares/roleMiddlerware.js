"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const { role } = req.body;
        if (!allowedRoles.includes(role)) {
            res.status(401).json({ message: "Unauthorized" });
        }
        else {
            next();
        }
    };
};
exports.default = roleMiddleware;
