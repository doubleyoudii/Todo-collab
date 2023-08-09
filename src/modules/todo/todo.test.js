const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../../server");
// import supertest from "supertest";

const Todo = mongoose.model("Todo", {
  description: String,
  isDone: { type: Boolean, default: false },
});

// Mock data
const mockTodos = [
  { description: "Todo 1", isDone: false },
  { description: "Todo 2", isDone: false },
  { description: "Todo 3", isDone: false },
  { description: "Todo 4", isDone: false },
  { description: "Todo 5", isDone: false },
];

jest.mock("mongoose", () => ({
  connect: jest.fn(),
  model: jest.fn(),
}));

describe("Paginated Route - GET All Todos", () => {
  let app;

  beforeAll(() => {
    app = server.listen(4000);
  });

  afterAll(async () => {
    await app.close();
  });

  it("should retrieve paginated todos", async () => {
    const mockCountDocuments = jest.fn(() => mockTodos.length);
    const mockFind = jest.fn(() => mockTodos);

    Todo.countDocuments = mockCountDocuments;
    Todo.find = mockFind;

    const response = await request(server).get("/api/todo/");

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockTodos);
    expect(response.body.page).toBe(1);
    expect(response.body.totalPages).toBe(1);
  });

  it("should handle errors", async () => {
    Todo.countDocuments = jest.fn(() => {
      throw new Error("Database error");
    });

    const response = await request(server).get("/api/todo/");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "An error occurred" });
  });
});
