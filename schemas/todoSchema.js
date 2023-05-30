const todosController = require("../controller/todosController");

const todo = {
  type: "object",
  properties: {
    id: { type: "integer" },
    title: { type: "string" },
    completed: { type: "boolean" },
  },
};

// options for getting all todos
const getTodosOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: todo,
      },
    },
  },
  handler: todosController.getTodos,
};

// options for creating a new todo
const createTodoOpts = {
  schema: {
    body: {
      type: "object",
      required: ["title", "completed"],
      properties: {
        title: { type: "string" },
        completed: { type: "boolean" },
      },
    },
    response: {
      201: todo,
    },
  },
  handler: todosController.createTodo,
};

// options for updating a todo
const updateTodoOpts = {
  schema: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "integer" },
      },
    },
    body: {
      type: "object",
      required: ["title", "completed"],
      properties: {
        title: { type: "string" },
        completed: { type: "boolean" },
      },
    },
    response: {
      200: todo,
    },
  },
  handler: todosController.updateTodo,
};

// options for deleting a todo
const deleteTodoOpts = {
  schema: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "integer" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: todosController.deleteTodo,
};

module.exports = {
  getTodosOpts,
  createTodoOpts,
  updateTodoOpts,
  deleteTodoOpts,
};
