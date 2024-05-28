import express from "express";
import {
  deleteUsers,
  getUsers,
  getUsersByName,
  loginUser,
  registerUsers,
  updateUsers,
} from "../controllers/usersControllers";
import { authorization } from "../middlewares/authorization";
const router = express.Router();

router.get("/", authorization, getUsers);
router.get("/", getUsersByName);

router.post("/register", registerUsers);
router.post("/login", loginUser);
router.put("/:id", updateUsers);
router.delete("/:id", deleteUsers);

export default router;
