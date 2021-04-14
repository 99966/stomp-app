import {DataTypes, Model} from 'sequelize'

class User extends Model {
}

// 创建 model
module.exports = (sequelize) => User.init({
    // Model attributes are defined here
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING,
    },
    user_account: {
        type: DataTypes.STRING,
    },
    user_email: {
        type: DataTypes.STRING
    },
    user_phone: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.TINYINT
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
});
