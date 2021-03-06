/**
 * 评论商品
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
      "review",
      {
        _id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: true,
          autoIncrement: true
        },
        userid: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        goodid: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        star: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        // 添加时间
        addTime:{
          type: DataTypes.STRING,
          allowNull: true,
        },
        // 评论内容
        review: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        /**
         * 如果为true，则表示名称和model相同，即address
         * 如果为fasle，mysql创建的表名称会是复数，即address
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: true
      }
    );
  };
  