import http from 'http';
import { Server } from 'socket.io';
import db from '../models/index.js';
import { v4 } from 'uuid';
import { createRoom, createMsg } from '../utils.js';
import { ClientMsgType, RoomInfoType, 
  RoomType 
} from '../types/socketTypes.js';

const { log } = console;

const socket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173", 
        "http://localhost:5500",
        "http://localhost:5555",
        "https://k-log3943.netlify.app",
      ],
      methods: ["GET", "POST", "OPTIONS"],
      credentials: true
    }
  });
  
  io.use(async(socket, next) => {
    const { nickName } = socket.handshake.auth;
    const { request: req } = socket;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress?.slice(7) as string;
    // nickName ? next() : next(new Error("Not exist user NickName"));
    if(nickName) {
      try {
        //^ 
        const user = await db.User.update({ latest_connection_id: socket.id, latest_contact_time: Date.now(), latest_ip: ip, status: "A" }, { where: { nick_name: nickName }, raw: true });
        if(user[0] === 0) socket.emit("not-exist-user", "존재하지 않는 닉네임 입니다.");
      } catch(e) {
        next();
      }
    }
    next();
  });

  io.on("connection", async (socket) => {
    log(`id: ${socket.id} connected`);
    const { request: req } = socket;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress?.slice(7);
    const nickName = socket.handshake.auth.nickName;
    const user = await db.User.findOne({ where: { nick_name: nickName, latest_connection_id: socket.id }, raw: true });
    socket.emit("first-connect", { msg: "scoket connected.", socketId: socket.id, id: user ? user.id : null });

    log('\x1b[31m%s', `${nickName}`);
    // log(req.headers["x-forwarded-for"], req.socket.remoteAddress)
    // socket.abc = "1";
    // log(socket.connected);
    // log(socket.disconnected);
    //! 채팅에 사용할 닉네임을 만든다.
    //! 닉네임은 유니크 하다.
    // log(io.sockets.adapter.sids);
    socket.on("create-nickname", async(nickName) => {
      try {
        const result = await db.User.findOne({ where: { nick_name: nickName }, raw: true });
        if(result) socket.emit("nickname-exist", "exist!!!");
        else {
          const newUser = {
            id: v4(),
            nick_name: nickName,
            role: "user",
            status: "A",
            latest_connection_id: socket.id,
            latest_contact_time: Date.now(),
            latest_ip: ip,
            createdAt: Date.now(),
            updatedAt: Date.now()
          };
          const result = await db.User.create(newUser);
          
          // log(result.id);
          // socket.join(result.id);
          // log(io.sockets.adapter.sids.get(socket.id));

          socket.emit("nickname-created", result.dataValues);
        }
      } catch(e) {
        console.log(e);
      };
    });

    socket.on("join-room", async(roomInfo: RoomInfoType) => {
      try {
        // const query = `
        //   SELECT 
        //     A.id AS userId,
        //     A.role,
        //     R.room_id AS roomId,
        //     R.purpose_type
        //   FROM User AS A
        //   LEFT JOIN Room AS R
        //   ON A.id = R.ownerId
        //   WHERE nick_name = ? AND latest_connection_id = ? AND R.purpose_type = ? AND R.deletedAt IS NULL;
        // `;
        // let roomId = null;

        // const roomI = await db.sequelize.query(query, {
        //   raw: true,
        //   type: db.sequelize.QueryTypes.SELECT,
        //   replacements: [roomInfo.nickName, roomInfo.socketId, roomInfo.roomType]
        // });
        // console.log(roomI, "1245087612058o7");

        const { id, role } = await db.User.findOne({ where: { nick_name: roomInfo.nickName, latest_connection_id: socket.id }});
        let room: RoomType = await db.Room.findOne({ where: { ownerId: id, purpose_type: roomInfo.roomType }, raw: true });

        if(!room) {
          const newRoomInfo = createRoom(id, roomInfo.roomType);
          room = await db.Room.create(newRoomInfo);
        }
        // log(roomInfo);
        socket.join(room.room_id);
        await db.Room.update({ current_state: "A" }, { where: { ownerId: id, purpose_type: roomInfo.roomType } });
        //! msg 이력 보내주기
        const msgs = await db.Msg.findAll({ where: { roomId: room.room_id }, raw: true });
        log(msgs);
        socket.emit(`joined-room`, {
          roomType: roomInfo.roomType,
          msgList: [{ msgType: "A", roomType: roomInfo.roomType, msg: `----- ${roomInfo.nickName}이 입장하셨습니다. -----`, role }, ...msgs]
        });

        // log(await io.in(room.room_id).fetchSockets());
      } catch(e) {
        log(e);
      }
    });

    socket.on("exit-room", async(roomInfo) => {
      try {
        await exitRoomHandler(roomInfo);
      } catch(e) {
        log(e);
      }
    });

    // Todo
    socket.on("room1", async(data: ClientMsgType) => {
      try {
        const newMsg = await createMsgHandler(data);
        console.log(data);
        socket.emit("send-msg-success room1", newMsg.dataValues);
      } catch(e) {
        log(e);
      }
    });
    // Todo
    socket.on("room2", async (data: ClientMsgType, ip: string) => {
      try {
        createMsgHandler(data);
        const newMsg = await createMsgHandler(data);
        socket.emit("send-msg-success room2", newMsg.dataValues);
      } catch(e) {
        log(e);
      }
    });

    socket.on("disconnect", async(reason) => {
      try {
        await disconnectUser(socket.id, nickName);
      } catch(e) {
        console.log(e);
      };
    });
  });

  
};

const createMsgHandler = async(data: ClientMsgType) => {
  log(data);  
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
    replacements: [data.nickName, data.roomType],
  });
  
  // const user = await db.User.findOne({ where: { nick_name: data.nickName, latest_connection_id: data.socketId }, raw: true });
  const newMsg = createMsg({ roomId: roomInfo.roomId, msg: data.msg, ip: "", userId: roomInfo.userId });
  return await db.Msg.create(newMsg);
};

const exitRoomHandler = async(roomInfo: RoomInfoType) => {
  const user = await db.User.findOne({ where: { nick_name: roomInfo.nickName }, raw: true });
  await db.Room.update(
    { current_state: "B" }, 
    { where: { ownerId: user.id, purpose_type: roomInfo.roomType }, raw: true }
  );
};

const disconnectUser = async(socketId: string, nickName: string) => await db.User.update({ status: "B" }, { where: { latest_connection_id: socketId, nick_name: nickName }, raw: true });

export default socket;