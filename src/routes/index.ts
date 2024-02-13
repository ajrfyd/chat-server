import express from "express";
import { Request,Response } from "express";
import userRouter from "./user/index.js";
import chatRouter from "./chat/index.js";

const routes = {
  user: userRouter,
  chat: chatRouter
};

export default routes;
