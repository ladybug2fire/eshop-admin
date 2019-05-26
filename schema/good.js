/**
 * 评论商品
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
      "good",
      {
        _id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: true,
          autoIncrement: true
        },
        goodname: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "goodname"
        },
        // 评分 好像没用到
        star: {
          type: DataTypes.FLOAT,
          allowNull: false,
          field: "star"
        },
        // 价格
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
          field: "price"
        },
        // 产品图片
        picUrl:{
            type: DataTypes.STRING,
            allowNull: false,
            field: "picUrl"
        },
        // 添加时间
        addTime:{
          type: DataTypes.STRING,
          allowNull: false,
          field: "addTime"
        },
        // 产品规格 如:500g 
        specify: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "specify"
        },
        // 类别
        cat: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "specify"
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
  