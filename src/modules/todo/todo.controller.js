import Todo from "./todo.model.js";
import { query, validationResult } from "express-validator";

const getAllTodo = async (req, res) => {
  try {
    const page = parseInt(req.body.page) || 1;
    const itemsPerPage = 5;

    const totalCount = await Todo.countDocuments();
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const todoLists = await Todo.find({})
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);
    res.status(200).json({
      message: "Get All Todo Success",
      data: todoLists,
      page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in Get All Todo" });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Id Not Found" });
    }

    res.status(200).json({ message: "Get Todo by ID Success", data: todo });
  } catch (error) {
    res.status(500).json({ message: "Error in Get Todo by Id" });
  }
};

const createTodo = async (req, res) => {
  try {
    const { description } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(404).send({ errors: result.array() });
    }
    const todo = await Todo.create({ description });

    res.status(200).json({ message: "Create Todo Success", data: todo });
  } catch (error) {
    res.status(500).json({ message: "Error in Create Todo" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, isDone } = req.body;

    const update = { description, isDone };

    const updateTodo = await Todo.findByIdAndUpdate(id, update, { new: true });

    if (!updateTodo) {
      return res.status(404).json({ message: "Update failed." });
    }

    res.status(200).json({ message: "Update Todo Success", data: updateTodo });
  } catch (error) {
    res.status(500).json({ message: "Error in Update Todo" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await Todo.findByIdAndRemove(id);

    res.status(200).json({ message: "Delete Todo Success" });
  } catch (error) {
    res.status(500).json({ message: "Error in Delete Todo" });
  }
};

export { getAllTodo, getTodoById, createTodo, updateTodo, deleteTodo };
