import {sequelize} from "../middleware/database";

const User = sequelize.model('User')

export const findUserByPassword = async userInfo => {
    return await User.findOne({
        where: {
            ...userInfo
        }
    })
}
