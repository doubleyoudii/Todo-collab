import express from "express";
import { query, body } from "express-validator";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  getTodoById,
  updateTodo,
} from "./todo.controller.js";

const router = express.Router();

router.get("/", getAllTodo);
router.get("/:id", getTodoById);
router.post("/", body("description").notEmpty().isString(), createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
