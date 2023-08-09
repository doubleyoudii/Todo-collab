import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import todoRouter from "../src/modules/todo/todo.route.js";
import "./db/mongoose.js";
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes Section --------------------------------
app.use("/api/todo", todoRouter); // Todo Route

const server = http.createServer(app);

export default server;
