import express from "express";
import { routeHandlerType } from "../../types/request.js";
const chatRouter = express.Router();
import { chatController } from "../../controllers/chatControllers.js";

const chat: routeHandlerType[] = [
  {
    path: "/",
    method: "get",
    handler: async (req, res) => {
      return res.json({
        status: 200,
        message: "ok",
        result: "msgList",
      });
    },
  },
  {
    path: "/send",
    method: "post",
    handler: async (req, res) => {
      try {
        const result = await chatController.setMsg(req.body);

        return res.json({
          status: 200,
          message: "ok",
          result,
        });
      } catch (e) {}
    },
  },
];

chat.forEach(({ path, method, handler }) => {
  chatRouter[method](`${path}`, handler);
});

export default chatRouter;
