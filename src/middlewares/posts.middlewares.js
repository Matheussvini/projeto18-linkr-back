import { postSchema } from "../models/posts.js";

export async function validShemaPost(req, res, next) {
  const { error } = postSchema.validate(req.body);
  if (error) return res.status(422).send(error.message);

  const { url, content } = req.body;
  const { id } = res.locals.user;

  res.locals.post = {
    url,
    content,
    user_id: id,
  };

  next();
}
