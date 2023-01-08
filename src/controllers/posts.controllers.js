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
      GROUP BY posts.id, users.username
      ORDER BY post_id DESC
        LIMIT 20;
          `
    );
    const newArr = [];

    for (let i = 0; i < rows.length; i++) {
      const query2 = await connnectionDB.query(
        `SELECT
          users.username
        FROM users
        JOIN likes
        ON users.id = likes.user_id
        WHERE likes.post_id = $1;`,
        [rows[i].post_id]
      );
      const likes = [];
      query2.rows.map((e) => {
        likes.push(e.username);
      });

      newArr.push({ ...rows[i], likes });
    }

    res.status(200).send(newArr);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function findByUserId(req, res) {
  const id = parseInt(req.params.id);

  try {
    const { rows } = await connnectionDB.query(
      `
    SELECT
      id AS post_id,
      content,
      url
    FROM posts
    WHERE posts.user_id = $1
    GROUP BY posts.id
    ORDER BY post_id DESC
    LIMIT 20;
        `,
      [id]
    );
    const newArr = [];

    for (let i = 0; i < rows.length; i++) {
      const query2 = await connnectionDB.query(
        `SELECT
          users.username
        FROM users
        JOIN likes
        ON users.id = likes.user_id
        WHERE likes.post_id = $1;`,
        [rows[i].post_id]
      );
      const likes = [];
      query2.rows.map((e) => {
        likes.push(e.username);
      });

      newArr.push({ ...rows[i], likes });
    }

    res.status(200).send(newArr);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
