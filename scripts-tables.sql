CREATE DATABASE linkrdb;

\c linkrdb

CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    username varchar(30) NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    pic_url TEXT NOT NULL
);

CREATE TABLE posts(
    id SERIAL NOT NULL PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id),
    url TEXT NOT NULL
);

CREATE TABLE likes(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    post_id INTEGER NOT NULL REFERENCES posts(id)
);

INSERT INTO users (username, email, password, pic_url)
VALUES ('juao', 'juaopaulo@gmail.com', '123456', 
'https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg');

INSERT INTO posts (url, content, user_id )
VALUES ('https://g1.globo.com/mundo/ucrania-russia/noticia/2023/01/08/russia-retoma-ofensivas-na-ucrania-apos-36-horas-de-cessar-fogo.ghtml',
'testando Russia', 5);

SELECT
    users.username,
    posts.id AS post_id,
    posts.content,
    posts.url
FROM posts
JOIN users
ON posts.user_id = users.id
ORDER BY post_id DESC
LIMIT 2;

