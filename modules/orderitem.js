// 引入mysql的配置文件
const db = require("../config/mysql-db");

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const OrderItem = Sequelize.import("../schema/orderitem");
OrderItem.sync({ force: false }); //自动创建表

module.exports = OrderItem;
