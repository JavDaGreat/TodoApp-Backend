const User = require("../model/User");

const getAllTodo = async (req, res) => {
  const { id } = req.body;
  const foundUser = await User.findById(id);

  const Todo = foundUser.tasks;
  console.log(Todo);
  if (!Todo || Todo.length === 0) return res.sendStatus(204);
  res.json(Todo);
};

const createTodo = async (req, res) => {
  const { id, todo } = req.body;
  if ((!todo.title && !todo.description) || !id)
    return res.status(400).json({ message: "bad request" });
  const foundUser = await User.findById(id);

  try {
    const result = await foundUser.tasks.push(todo);
    await foundUser.save();
    console.log(result);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTodo = async (req, res) => {
  const { id, newTodo, todoId } = req.body;

  if (!newTodo.title && !newTodo.description)
    return res.status(400).json({ message: "todo can not be empty" });
  try {
    const foundUser = await User.findById(id);
    const taskToUpdate = foundUser.tasks.find(
      (task) => task._id.toString() === todoId
    );
    console.log(taskToUpdate);

    if (!taskToUpdate) return res.sendStatus(404);

    taskToUpdate.title = newTodo.title;
    taskToUpdate.description = newTodo.description;

    await foundUser.save();

    res.status(201).json({ message: "success" });
  } catch (err) {
    res.sendStatus(500).json(err.message);
  }
};

const deleteTodo = async (req, res) => {
  const { id, todoId } = req.body;
  if (!todoId || !id) return res.sendStatus(400);
  const foundUser = await User.findById(id);
  const taskToDelete = foundUser.tasks.findIndex(
    (task) => task._id.toString() === todoId
  );
  console.log(taskToDelete);
  foundUser.tasks.splice(taskToDelete, 1);

  await foundUser.save();
  res.sendStatus(200);
};
module.exports = { getAllTodo, createTodo, updateTodo, deleteTodo };
