import { connnectionDB } from "../database/db.js";

export async function createPost(req, res) {
  const { url, content, user_id } = res.locals.post;

  try {
    await connnectionDB.query(
      `
            INSERT INTO posts (url, content, user_id )
            VALUES ($1, $2, $3)
        `,
      [url, content, user_id]
    );

    res.status(201).send("Post publicado com sucesso");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function findAll(req, res) {
  try {
    const { rows } = await connnectionDB.query(
      `
        SELECT
        users.username,
        posts.id AS post_id,
        posts.content,
        posts.url
    FROM posts
    JOIN users
    ON posts.user_id = users.id
    ORDER BY post_id DESC
    LIMIT 20;
          `
    );

    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
