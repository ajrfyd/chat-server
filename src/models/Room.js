const Room = (sequelize, DataTypes) => {
  const { STRING, DATE, CHAR, INTEGER } = DataTypes;

  const room = sequelize.define("Room", {
    room_id: {
      type: STRING(50),
      primaryKey: true,
      allowNull: false,
      unique: true,
      comment: "방 고유번호",
    },
    room_name: {
      type: STRING(100),
      allowNull: true,
      comment: "방 이름",
    },
    room_desc: {
      type: STRING(500),
      allowNull: true,
      comment: "방설명",
    },
    img_url: {
      type: STRING(100),
      allowNull: true,
      comment: "채널이미지 경로",
    },
    ref_id: {
      type: STRING(50),
      allowNull: true,
      comment: "참조 아이디",
    },
    user_limit: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      defaultValues: 1,
      comment: "최대접속자",
    },
    current_state: {
      type: CHAR(1),
      allowNull: false,
      comment: "A: 사용중(Opend), B: 비사용(Closed)",
    },
    room_type: {
      type: CHAR(1),
      allowNull: false,
      defaultValues: "B",
      comment: "A: 공개방 B: 비밀방",
    },
    purpose_type: {
      type: CHAR(1),
      allowNull: false,
      defaultValues: "A",
      comment: "A: 일반문의, B: 게시글문의",
    },
    enter_password: {
      type: STRING(100),
      allowNull: true,
      comment: "방 비밀번호",
    },
    // create_user_id: {
    //   type: STRING(50),
    //   allowNull: false,
    //   comment: "생성 유저 아이디",
    // },
    delete_user_id: {
      type: STRING(50),
      allowNull: true,
      comment: "삭제 유저 아이디",
    },
    deletedAt: {
      type: DATE,
      allowNull: true,
      comment: "삭제일시",
    },
  },{
    tableName: "Room",
    timestamps: true,
    paranoid: true,
  });

  room.associate = (model) => room.hasMany(model.Msg, { foreignKey: "roomId", target: "room_id", onDelete: "SET NULL" });

  return room;
};

export default Room;