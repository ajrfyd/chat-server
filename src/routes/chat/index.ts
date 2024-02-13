import express from "express";
import { routeHandlerType } from "../../types/request.js";
const chatRouter = express.Router();

const chat: routeHandlerType[] = [
  {
    path: "/",
    method: "get",
    handler: async(req, res) => {
      return res.json({
        status: 200,
        message: "ok",
        result: "msgList"
      });  
    }
  }
];

chat.forEach(({ path, method, handler }) => {
  chatRouter[method](`${path}`, handler);
});


export default chatRouter;