import { connnectionDB } from "../database/db.js";
import { signInSchema, signUpSchema } from "../models/users.js";


export async function validShemaSignUp(req, res, next) {
    
  }

export async function validShemaSignIn(req, res, next) {
    const { error } = signInSchema.validate(req.body);
    if (error) return res.status(422).send(error.message);
  
    const user = req.body;
  
    const result = await connnectionDB.query(
      "SELECT * FROM users WHERE email = $1",
      [user.email]
    );
  
    if (result.rowCount === 0) {
      return res.status(409).send({
        message:
          "Email não cadastrado, por favor verifique o email ou cadastre-se.",
      });
    }
    res.locals.user = user;
  
    next();
  }