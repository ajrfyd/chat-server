import express from "express";
const userRouter = express.Router();
import { routeHandlerType } from "../../types/request.js";
import { userController } from "../../controllers/userController.js";

const user: routeHandlerType[] = [
  {
    path: "/search/:nickName",
    method: "get",
    handler: async(req, res) => {
      const { nickName } = req.params;
      const { resultState } = req;

      try {
        const user = await userController.getUser(nickName);

        return res.json({
          ...resultState,
          result: user,
        });

      } catch(e: any) {
        return res.status(500).json({
          ...resultState,
          status: 500,
          message: `${e.name}: ${e.message}`
        })
      };
    }
  }
];

user.forEach(({ path, method, handler }) => {
  userRouter[method](`${path}`, handler);
});

export default userRouter;