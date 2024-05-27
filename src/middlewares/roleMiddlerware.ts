import { Request, Response, NextFunction } from "express";

const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.body;
    if (!allowedRoles.includes(role)) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      next();
    }
  };
};

export default roleMiddleware;
