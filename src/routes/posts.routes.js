import { Router } from "express";
import { createPost, findAll, findByUserId } from "../controllers/posts.controllers.js";
import authValidation from "../middlewares/authValidation.js";
import { validShemaPost } from "../middlewares/posts.middlewares.js";

const router = Router();

router.use(authValidation);

router.get("/posts", findAll);
router.get("/posts/user/:id", findByUserId);
router.post("/posts", validShemaPost, createPost);
// router.delete("/urls/:id", validShemaDelete, deletePost);

export default router;
