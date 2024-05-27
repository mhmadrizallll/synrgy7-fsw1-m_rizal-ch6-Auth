import express from "express";
const router = express.Router();
import usersRouter from "./usersRouter";
import invoicesRouter from "./invoicesRouter";

router.use("/", invoicesRouter);
router.use("/users", usersRouter);

export default router;
