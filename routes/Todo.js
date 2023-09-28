const express = require("express");
const router = express.Router();
const TodoController = require("../controller/TodoController");
const verifyJWT = require("../middleware/verifyJWT");
router
  .route("/")
  .get(verifyJWT, TodoController.getAllTodo)
  .post(verifyJWT, TodoController.createTodo)
  .put(verifyJWT, TodoController.updateTodo)
  .delete(verifyJWT, TodoController.deleteTodo);
module.exports = router;
