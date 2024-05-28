import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authorization = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ status: false, message: "Invalid token" });
      return;
    }

    jwt.verify(authorization.split(" ")[1], "secret");

    next();
  } catch (err) {
    res.status(500).json({ status: false, message: err });
  }
};

export { authorization };
