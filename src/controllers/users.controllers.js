import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connnectionDB } from "../database/db.js";
import dotenv from "dotenv";
dotenv.config();

export async function login(req, res) {
    try {
      const { email, password } = res.locals.user;
      const { rows } = await connnectionDB.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
  
      const user = rows[0];
  
      if (bcrypt.compareSync(password, user.password)) {
        const data = { user_id: user.id };
        const secretKey = process.env.JWT_SECRET;
  
        const token = jwt.sign(data, secretKey);
  
        delete user.password;
  
        res.status(200).send({ ...user, token });
      } else {
        res.status(401).send({
          message: "Senha incorreta, verifique sua senha e tente novamente.",
        });
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }