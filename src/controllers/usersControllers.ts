import { Request, Response } from "express";
import { UsersModel } from "../models/users.model";
import { v4 } from "uuid";
import { encryptPassword, checkPassword } from "../helpers/bcrypt";
import jwt from "jsonwebtoken";

const getUsers = async (req: Request, res: Response) => {
  const users = await UsersModel.query();
  res.status(200).json({ data: users });
};

const getUsersByName = async (req: Request, res: Response) => {
  try {
    const name = req.query.name;
    const user = await UsersModel.query().findOne({ name });
    if (!user) {
      res.status(400).json({ status: false, message: "User not found" });
    }
    res.status(200).json({ status: true, data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
  }
};

const registerUsers = async (req: Request, res: Response) => {
  try {
    const { password, name, email, ...users } = req.body;

    const validatePassword = (password: string) => {
      const capitalLetter = /^[A-Z]/;
      const containNumber = /[0-9]/;
      const containSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

      if (
        capitalLetter.test(password) &&
        containNumber.test(password) &&
        containSpecialChar.test(password)
      ) {
        return true;
      }
      return false;
    };

    if (!name || name.trim() === "") {
      return res.status(400).json({ status: false, message: "Name not valid" });
    }

    if (!email || email.trim() === "") {
      return res
        .status(400)
        .json({ status: false, message: "Email not valid" });
    }

    if (!validatePassword(password)) {
      return res
        .status(400)
        .json({ status: false, message: "Password not valid" });
    }

    const payload = {
      ...users,
      password: await encryptPassword(password),
      id: v4(),
      name,
      email: email.toLowerCase(),
    };

    const user = await UsersModel.query().findOne({ name: payload.name });
    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }

    await UsersModel.query().insert(payload);
    res
      .status(201)
      .json({ status: true, message: "User created", data: payload });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    const user = await UsersModel.query().findOne({ email });

    if (!user) {
      res.status(400).json({ status: false, message: "User not found" });
    } else {
      const isPasswordCorrect = await checkPassword(user.password, password);

      if (!isPasswordCorrect) {
        res.status(400).json({ status: false, message: "Wrong password" });
      } else {
        const payload = {
          id: user.id,
          role: user.role,
        };
        const token = jwt.sign(payload, "secret", { expiresIn: "30d" });

        res.status(200).json({
          status: true,
          message: "Login successful",
          token,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
  }
};

const updateUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const { name, email, password, ...users } = req.body;
    const validatePassword = (password: string) => {
      const capitalLetter = /^[A-Z]/;
      const containNumber = /[0-9]/;
      const containSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

      if (
        capitalLetter.test(password) &&
        containNumber.test(password) &&
        containSpecialChar.test(password)
      ) {
        return true;
      }
      return false;
    };

    if (!name || name.trim() === "") {
      res.status(400).json({ status: false, message: "Name not valid" });
      return;
    }

    if (!email || email.trim() === "") {
      res.status(400).json({ status: false, message: "Email not valid" });
      return;
    }

    if (!validatePassword(password)) {
      res.status(400).json({ status: false, message: "Password not valid" });
      return;
    }

    const user = await UsersModel.query().findById(id);

    if (!user) {
      res.status(400).json({ status: false, message: "User not found" });
    }

    const updateUsers = {
      ...users,
      name,
      email: email.toLowerCase(),
      password: await encryptPassword(password),
    };

    await UsersModel.query().updateAndFetchById(id, updateUsers);
    res
      .status(200)
      .json({ status: true, message: "User updated", data: updateUsers });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
  }
};

const deleteUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const user = await UsersModel.query().deleteById(id);
    res.status(200).json({ status: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ status: false, message: err });
  }
};

export {
  getUsers,
  getUsersByName,
  registerUsers,
  loginUser,
  updateUsers,
  deleteUsers,
};
