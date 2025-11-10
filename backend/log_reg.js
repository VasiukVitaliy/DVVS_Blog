import pool from "./db.js"
import bcrypt from 'bcrypt';
import { uploadToCloudinary } from './cloudinary.js';
import { Buffer } from 'buffer';


const SALT_ROUNDS = 12;

export async function registration(req, res) {
  try {
    const { nick, login, password } = req.body;
    const avatar = req.file; 

    let avatarUrl = null
    if (avatar) {
      avatarUrl = await uploadToCloudinary(avatar.path);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const ansDB = await pool.query(
      "INSERT INTO users (nick, login, password, avatar) VALUES ($1, $2, $3, $4)",
      [nick, login, hashedPassword, avatarUrl]
    );

    return res.status(201).send("User added successfully");

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}


export async function login(req, res) {
  try {
    const { login, password } = req.body;

    const ansDB = await pool.query(
      "SELECT password FROM users WHERE login = $1",
      [login]
    );

    if (ansDB.rowCount === 0) {
      return res.status(400).json({"authenticate": false});
    }

    const storedHash = ansDB.rows[0].password;

    const isMatch = await bcrypt.compare(password, storedHash);
    if (!isMatch) {
      return res.status(403).json({"authenticate": false});
    }

    return res.status(200).json({"authenticate": true});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
