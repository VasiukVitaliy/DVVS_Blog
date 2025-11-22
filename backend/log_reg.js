import pool from "./db.js";
import bcrypt from "bcrypt";
import { uploadToCloudinary } from "./cloudinary.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET;

export async function registration(req, res) {
  try {
    const { nick, login, password } = req.body;
    const avatar = req.file;

    let avatarUrl = null;
    if (avatar) {
      avatarUrl = await uploadToCloudinary(avatar.path);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const ansDB = await pool.query(
      "INSERT INTO users (nick, login, password, avatar) VALUES ($1, $2, $3, $4) RETURNING id, nick, login, avatar",
      [nick, login, hashedPassword, avatarUrl]
    );
    const newUser = ansDB.rows[0];
    return res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}


export async function login(req, res) {
  try {
    const { login, password } = req.body;

    const ansDB = await pool.query(
      "SELECT id, nick, password FROM users WHERE login = $1",
      [login]
    );

    if (ansDB.rowCount === 0) {
      return res.status(400).json({ authenticate: false, message: "User not found" });
    }

    const user = ansDB.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(403).json({ authenticate: false, message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.id, nick: user.nick, login: user.login },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ authenticate: true, token, nick: user.nick });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
