import { Router } from "express";
import { createUser, login } from "../controllers/users.controllers.js";
import { validShemaSignIn, validShemaSignUp } from "../middlewares/users.middlewares.js";

const router = Router();

router.post('/sign-up', validShemaSignUp, createUser);
router.post('/', validShemaSignIn, login);
// router.get('/users/me', authValidation , findById);

export default router;
