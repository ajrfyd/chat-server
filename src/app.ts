import express from "express";
import cors from "cors";
import "./config/envConfig.js";
import db from "./models/index.js";
import http from "http";
import socket from "./socket/socket.js";
import { errorHandler, initResponseObj } from "./middleware/index.js";
import routes from "./routes/index.js";

const { PORT } = process.env;
const app = express();
const server = http.createServer(app);
const { log } = console;

db.sequelize.sync().catch((e: any) => {
  console.log("!!!!!!");
  console.log(e);
});

socket(server);

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({
  methods: ["GET", "POST", "OPTIONS"],
  origin: ["http://localhost:5173", "http://localhost:5555"]
}));

app.use(initResponseObj);
app.use("/user", routes.user);
app.use("/chat", routes.chat);

app.get("/", (req, res) => {
  res.send("<h1>Welcome Chat server!!</h1>");
});

app.use(errorHandler);

app.get("*", (req, res) => {
  res.send("<h1>404 Not Found</h1>");
});

server.listen(PORT, () => {
  log(`Server Listening on port: ${PORT}!!`);
});

