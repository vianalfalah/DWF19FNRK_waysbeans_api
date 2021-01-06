const express = require("express");

const router = express.Router();

const { uploadSingle } = require("../../multer/uploadimg");

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
const isAdmin = require("../../middlewares/isAdmin");
router.post("/register", register);
router.post("/login", login);

//Users
const {
  getUsers,
  getSingleUserById,
  deleteUser,
  restoreUser,
  getProfile,
} = require("../controllers/user");

router.get("/users", auth, isAdmin, getUsers);
// router.get("/user/:id", auth, getSingleUserById);
router.delete("/user/:id", auth, isAdmin, deleteUser);
router.post("/user-restore/:id", auth, isAdmin, restoreUser);
router.get("/my-profile", auth, getProfile);

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
router.post("/product/", auth, isAdmin, uploadSingle("photo"), addProduct);
router.patch("/product/:id", auth, isAdmin, updateProduct);
router.delete("/product/:id", auth, isAdmin, deleteProduct);
router.post("/product-restore/:id", auth, isAdmin, restoreProduct);

//transactions
const {
  getTransactions,
  getSingleTranById,
  addTran,
  updateTran,
  deleteTran,
  restoreTran,
  getMyTransaction,
} = require("../controllers/transaction");

router.get("/transactions", auth, isAdmin, getTransactions);
router.get("/transaction/:id", auth, isAdmin, getSingleTranById);
router.post("/transaction/", auth, uploadSingle("attachment"), addTran);
router.patch("/transaction/:id", auth, updateTran);
router.delete("/transaction/:id", auth, isAdmin, deleteTran);
// router.post("/transaction-restore/:id", auth, restoreTran);
router.get("/my-transactions", auth, getMyTransaction);

module.exports = router;
