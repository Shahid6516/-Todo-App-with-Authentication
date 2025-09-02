import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controller/todo.js";
import isAuthanticated from "../middleware/isAuthanticated.js";

const router = express.Router();

router.post("/", isAuthanticated, createTodo);
router.get("/", getAllTodos);
router.put("/:todoId", isAuthanticated, updateTodo);
router.delete("/:todoId", isAuthanticated, deleteTodo);

export default router;
