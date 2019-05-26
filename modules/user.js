// 引入mysql的配置文件
const db = require('../config/mysql-db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const User = Sequelize.import('../schema/user');
User.sync({force: false}); //自动创建表

class UserModel {
    /**
     * 创建用户模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createUser(data){
        return await User.create(data);
    }

    /**
     * 查询用户详情
     * @param _id 用户ID
     * @returns {Promise<Model>}
     */
    static async getUserDetail(_id){
        return await User.findOne({
            where:{
                _id
            }
        });
    }

    static async getUser(username){
        return await User.findOne({
            where:{
                username
            }
        }); 
    }

    static async getAll(){
        return await User.findAll();
    }

    static async del(_id){
        return await User.destroy({
            where:{
                _id
            }
        })
    }

    static async update(user){
        return await User.update(user, {
            where:{
                _id: user._id
            }
        })
    }
    
}

module.exports = UserModel;