module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "username"
      },
      sex: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "sex"
      },
      birthday: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "birthday"
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "password"
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "phone"
      },
      // 头像url
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "avatar"
      },
      // 简介
      desc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "desc"
      }
    },
    {
      /**
       * 如果为true，则表示名称和model相同，即user
       * 如果为fasle，mysql创建的表名称会是复数，即users
       * 如果指定的表名称本身就是复数，则形式不变
       */
      freezeTableName: true
    }
  );
};
