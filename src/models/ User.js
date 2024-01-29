const User = (sequelize, DataTypes) => {
  const { STRING, DATE, CHAR } = DataTypes;

  const user = sequelize.define("User", {
    id: {
      type: STRING(50),
      primaryKey: true,
      allowNull: false,
      comment: '유저 아이디',
    },
    nick_name: {
      type: STRING(100),
      allowNull: true,
      comment: '닉네임',
    },
    profile_img_url: {
      type: STRING(200),
      allowNull: true,
      comment: '프로필 사진 url',
    },
    role: {
      type: CHAR(5),
      allowNull: false,
      defaultValue: "user",
      comment: 'admin or user',
    },
    status: {
      type: CHAR(1),
      allowNull: false,
      defaultValue: "A",
      comment: 'A: 온라인, B: 오프라인'
    },
    latest_connection_id: {
      type: STRING(100),
      allowNull: true,
      comment: '소켓 아이디',
    },
    latest_contact_time: {
      type: DATE,
      allowNull: false,
      defaultValue: sequelize.fn("NOW"),
      comment: '최근 접속일시',
    },
    latest_ip: {
      type: STRING(100),
      allowNull: true,
      comment: '최근접속 IP',
    },
    deletedAt: {
      type: DATE,
      allowNull: true,
      comment: "삭제 일시"
    }
  }, {
    tableName: "User",
    paranoid: true,
    timestamps: true
  });

  return user;
};

export default User;