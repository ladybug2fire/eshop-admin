// 引入mysql的配置文件
const db = require("../config/mysql-db");

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型

const User = Sequelize.import("../schema/user");
const Good = require("./good");
const Review = require("./review");
const Favorite = require("./favorite");
User.belongsToMany(Good, { through: Favorite, foreignKey: "userid" });
Good.belongsToMany(User, { through: Favorite, foreignKey: "goodid" });

// User.hasMany(Review, {foreignKey: 'userid'})
Review.belongsTo(User, { foreignKey: "userid" });
Sequelize.sync({ force: false }); //自动创建表
module.exports = User;
