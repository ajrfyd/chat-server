type CharType = "A" | "B";

export type RoomInfoType = {
  nickName: string;
  socketId: string; 
  roomType: CharType;
};

export type ClientMsgType = RoomInfoType & {
  msg: string;
};

export type UserRoomInfoType = {
  userId: string;
  role: string;
  roomId: string;
  purpose_type: CharType;
};

export type RoomType = {
  room_id: string;
  room_name?: string;
  room_desc?: string;
  img_url?: string;
  ref_id?: string;
  user_limit: number;
  current_state: CharType;
  room_type: CharType;
  purpose_type: CharType;
  enter_password?: string;
  delete_user_id: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}