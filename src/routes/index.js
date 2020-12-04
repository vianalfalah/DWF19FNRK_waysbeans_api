const express = require("express");

const router = express.Router();

//Biar Gak Lupa
// const {
//   getTodos,
//   getTodo,
//   addTodo,
//   updateTodo,
//   deleteTodo,
// } = require("../controllers/todos");

// const { getPosts } = require("../controllers/post");

// router.get("/todos", getTodos);
// router.get("/todo/:id", getTodo);
// router.post("/todo", addTodo);
// router.put("/todo/:id", updateTodo);
// router.delete("/todo/:id", deleteTodo);

// router.get("/posts", getPosts);

const { register, login, auth } = require("../controllers/auth");
// router.post("/register", register);
router.post("/login", login);

//Users
const {
  getUsers,
  getSingleUserById,
  addUser,
  updateUser,
  deleteUser,
  restoreUser,
} = require("../controllers/user");

router.get("/users", getUsers);
router.get("/user/:id", getSingleUserById);
router.delete("/user/:id", deleteUser);
router.post("/user-restore/:id", restoreUser);

//Products
const {
  getProducts,
  getSingleProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
} = require("../controllers/products");

router.get("/products", getProducts);
router.get("/product/:id", getSingleProductById);
router.post("/product/", addProduct);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);
router.post("/product-restore/:id", restoreProduct);

const {
  getTransactions,
  getSingleTranById,
  addTran,
  updateTran,
  deleteTran,
  restoreTran,
} = require("../controllers/transaction");

router.get("/transactions", auth, getTransactions);
router.get("/transaction/:id", getSingleTranById);
router.post("/transaction/", addTran);
router.patch("/transaction/:id", updateTran);
router.delete("/transaction/:id", deleteTran);
router.post("/transaction-restore/:id", restoreTran);

module.exports = router;
