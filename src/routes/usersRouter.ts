import express from "express";
import {
  addUsers,
  deleteUsers,
  getUsers,
  loginUser,
  registerUsers,
  updateUsers,
  viewLogin,
} from "../controllers/usersControllers";
const router = express.Router();

router.get("/", getUsers);
// register
router.post("/", registerUsers);
// router.post("/", addUsers);
router.get("/login", viewLogin);
router.post("/login", loginUser);
router.put("/:id", updateUsers);
router.delete("/:id", deleteUsers);

export default router;
