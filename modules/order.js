// 引入mysql的配置文件
const db = require("../config/mysql-db");

// 引入sequelize对象
const Sequelize = db.sequelize;
// 引入数据表模型
const Order = Sequelize.import("../schema/order");
const OrderItem = require("./orderitem");
const Good = require("./good");
const User = require("./user");
Order.belongsToMany(Good, { through: OrderItem, foreignKey: "orderid" });
Good.belongsToMany(Order, { through: OrderItem, foreignKey: "goodid" });

Order.belongsTo(User, { foreignKey: "userid" });
Sequelize.sync({ force: false }); //自动创建表

module.exports = Order;
