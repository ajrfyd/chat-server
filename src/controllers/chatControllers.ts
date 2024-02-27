import db from "../models/index.js";
import { type ClientMsgType } from "../types/socketTypes";
import { createMsg } from "../utils.js";

export const chatController = {
  getMsgs: async () => {
    return "msgList";
  },
  setMsg: async (newMsg: ClientMsgType) => {
    // const newMessage = await db.Msg.create({});
    // console.log(newMsg);
    const query = `
      SELECT
        U.id AS userId,
        nick_name AS nickName,
        role,
        room_id AS roomId
      FROM User AS U
      LEFT JOIN Room AS R
      ON U.id = R.ownerId
      WHERE nick_name = ? AND R.purpose_type = ? AND R.deletedAt IS NULL;
    `;
    const [roomInfo] = await db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT,
      raw: true,
      replacements: [newMsg.nickName, newMsg.roomType],
    });

    // const user = await db.User.findOne({ where: { nick_name: data.nickName, latest_connection_id: data.socketId }, raw: true });
    const newMessage = createMsg({
      roomId: roomInfo.roomId,
      msg: newMsg.msg,
      ip: "",
      userId: roomInfo.userId,
    });

    return await db.Msg.create(newMessage);
  },
};
