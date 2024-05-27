import { Request, Response } from "express";
import { UsersModel } from "../models/users.model";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const encryptPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, result) => {
      if (!!err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const registerUsers = async (req: Request, res: Response) => {
  try {
    const payload = {
      ...req.body,
      password: await encryptPassword(req.body.password),
      id: v4(),
    };

    await UsersModel.query().insert(payload);
    res
      .status(201)
      .json({ status: true, message: "User created", data: payload });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const getUsers = async (req: Request, res: Response) => {
  const users = await UsersModel.query();
  res.status(200).json({ data: users });
};

const addUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password, role } = req.body;
    const user = await UsersModel.query().insert({
      name,
      password,
      role,
    });
    res.status(201).json({ data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

// login

const viewLogin = async (req: Request, res: Response) => {
  res.status(200).render("index");
};
const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { name, password } = req.body;
  try {
    const user = await UsersModel.query().findOne({ name, password });
    if (!user) res.status(404).json({ message: "User not found" });
    // res.status(200).json({ message: "Login successful", data: user });
    res.status(200).render("dashboard", { data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

// end

const updateUsers = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const { name, password, role } = req.body;
    const user = await UsersModel.query().patchAndFetchById(id, {
      name,
      password,
      role,
    });
    res.status(200).json({ data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const deleteUsers = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const user = await UsersModel.query().deleteById(id);
    res.status(200).json({ message: "User deleted" });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  registerUsers,
  getUsers,
  addUsers,
  updateUsers,
  deleteUsers,
  loginUser,
  viewLogin,
};
