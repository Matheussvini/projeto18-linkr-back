import { Router } from "express";
import { login } from "../controllers/users.controllers.js";
import { validShemaSignIn, validShemaSignUp } from "../middlewares/users.middlewares.js";

const router = Router();

// router.post('/signup', createUser);
router.post('/', validShemaSignIn, login);
// router.get('/users/me', authValidation , findById);

export default router;
