import express from "express";
import cors from "cors";
import "./config/envConfig.js";
import db from "./models/index.js";
import { errorHandler } from "./middleware/index.js";

const { PORT } = process.env;
const app = express();
const { log } = console;

db.sequelize.sync().catch((e: any) => {
  console.log("!!!!!!");
  console.log(e);
});

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({
  methods: ["GET", "POST", "OPTIONS"],
  origin: ["http://localhost:5173"]
}));

app.get("/", (req, res) => {
  res.send("<h1>Welcome Chat server!!</h1>");
});

app.use(errorHandler);

app.get("*", (req, res) => {
  res.send("<h1>404 Not Found</h1>");
});

app.listen(PORT, () => {
  log(`Server Listening on port: ${PORT}!!`);
});