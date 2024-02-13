import { v4 } from "uuid";

export const createRoom = (userId: string, type: "A" | "B") => ({
  room_id: v4(),
  user_limit: 2,
  current_state: "A",
  room_type: "B",
  purpose_type: type,
  // create_user_id: userId,
  createdAt: Date.now(),
  ownerId: userId
});

export const createMsg = ({ roomId, msg, ip, userId }: { roomId: string; msg: string; ip: string; userId: string }) => ({ 
  msg,
  contact_ip: ip,
  msg_state: "B",
  is_fixed: "B",
  create_user_id: userId,
  createdAt: Date.now(),
  roomId
});