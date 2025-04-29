const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "blog_db",
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// Create Blog Post
app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  const sql = "INSERT INTO posts (title, content) VALUES (?, ?)";
  db.query(sql, [title, content], (err, result) => {
    if (err) throw err;
    res.send({ message: "Post created", postId: result.insertId });
  });
});

// Read Blog Posts
app.get("/posts", (req, res) => {
  const sql = "SELECT * FROM posts";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Update a Blog Post
app.put("/posts/:id", (req, res) => {
  const { title, content } = req.body;
  const sql = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
  db.query(sql, [title, content, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ message: "Post updated" });
  });
});

// Delete a Blog Post
app.delete("/posts/:id", (req, res) => {
  const sql = "DELETE FROM posts WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ message: "Post deleted" });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
