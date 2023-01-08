import { Router } from "express";
import { createPost, findAll } from "../controllers/posts.controllers.js";
import authValidation from "../middlewares/authValidation.js";
import { validShemaPost } from "../middlewares/posts.middlewares.js";

const router = Router();

router.use(authValidation);

router.get("/posts", findAll);
router.get("/posts/:id", findById);
router.post("/urls/shorten", validShemaPost, createPost);
router.delete("/urls/:id", validShemaDelete, deletePost);

export default router;
