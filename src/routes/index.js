const express = require("express");

const router = express.Router();

const {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todos");

const { getPosts } = require("../controllers/post");

const {
  getUsers,
  getSingleUserById,
  addUser,
  updateUser,
  deleteUser,
  restoreUser,
} = require("../controllers/user");

router.get("/todos", getTodos);
router.get("/todo/:id", getTodo);
router.post("/todo", addTodo);
router.put("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);

router.get("/posts", getPosts);

router.get("/users", getUsers);
router.get("/user/:id", getSingleUserById);
router.post("/user/", addUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.post("/user-restore/:id", restoreUser);

module.exports = router;
