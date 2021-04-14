import {DataTypes, Model} from 'sequelize'

class SocketDetail extends Model {
}

// 创建 model
module.exports = (sequelize) => SocketDetail.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.STRING(32),
        primaryKey: true
    },
    socket_id: {
        type: DataTypes.STRING(32),
        primaryKey: true
    },
    socket_status: {
        type: DataTypes.TINYINT,
    },
    message: {
        type: DataTypes.STRING
    },
    remote_ip: {
        type: DataTypes.STRING
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'SocketDetail', // We need to choose the model name,
    // tableName: 'socket_detail'
    tableName: 'socket_detail'
});
