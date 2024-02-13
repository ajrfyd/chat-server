import db from "../models/index.js";

export const userController = {
  getUser: async(nickName: string) => {
    const user = await db.User.findOne({ where: { nick_name: nickName }, raw: true });
    return user;
  },

};