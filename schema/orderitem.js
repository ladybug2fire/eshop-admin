/**
 * 订单商品数量
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
      "orderitem",
      {
        _id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: true,
          autoIncrement: true
        },
        goodid: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        orderid: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        // 订单中产品数量
        count: {
          type: DataTypes.INTEGER,
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
  