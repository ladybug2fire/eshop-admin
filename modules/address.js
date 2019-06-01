// 引入mysql的配置文件
const db = require("../config/mysql-db");

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Address = Sequelize.import("../schema/address");
Address.sync({ force: false }); //自动创建表

module.exports = Address;
