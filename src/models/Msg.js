const Msg = (sequelize, DataTypes) => {
  const { STRING, CHAR, DATE, INTEGER } = DataTypes;

  const msg = sequelize.define('Msg', {
    msg_id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '메세지 아이디',
    },
    // msg_type: {
    //   type: CHAR(1),
    //   allowNull: false,
    //   comment: '메시지유형코드 1: 입장 1: 퇴장 3:공지',
    // },
    msg: {
      type: STRING(1000),
      allowNull: false,
      comment: '메세지',
    },
    socket_id: {
      type: STRING(100),
      allowNull: true,
      comment: '소켓 아이디',
    },
    contact_ip: {
      type: STRING(100),
      allowNull: true,
      comment: 'ip',
    },
    msg_state: {
      type: CHAR(1),
      allowNull: false,
      defaultValues: "B",
      comment: 'A: 읽음 B: 읽지않음',
    },
    is_fixed: {
      type: CHAR(1),
      allowNull: true,
      comment: 'A: 고정 B: 비고정',
    },
    create_user_id: {
      type: STRING(50),
      allowNull: false,
      comment: '작성자 아이디',
    },
    delete_user_id: {
      type: STRING(50),
      allowNull: true,
      comment: '삭제자 아이디',
    },
    deletedAt: {
      type: DATE,
      allowNull: true,
      comment: '삭제일시',
    },
  }, {
    tableName: "Msg",
    paranoid: true,
    timestamps: true,
  });

  return msg;
}

export default Msg;