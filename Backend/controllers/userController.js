import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

// Registration Controller
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userNameCheck = await User.findOne({ username });

    if (userNameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (er) {
    next(er);
  }
};

//Login Controller
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }

    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }

    delete user.password;
    return res.json({ status: true, user });
  } catch (er) {
    next(er);
  }
};

//Setting Avatar Controller
export const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (er) {
    next(er);
  }
};

//Controller to get all users from Dsatabase
export const getAllUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await User.find({ _id: { $ne: id } }).select([
      "_id",
      "username",
      "email",
      "avatarImage",
    ]);

    return res.json({ users: users });
  } catch (ex) {
    next(ex);
  }
};
