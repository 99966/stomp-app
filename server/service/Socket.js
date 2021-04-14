import {sequelize} from "../middleware/database";

const socketDetail = sequelize.model('SocketDetail')

export const getOneUser = async id => {

    try {
        const user = await socketDetail.findOne({
            where: {socket_id: id}
        })
        return user.get()
    } catch (e) {
        return e
    }


}

export const create = async data => {
    try {

        return await socketDetail.create({
            ...data
        });
    } catch (e) {
        return e
    }

}

export const updateByUniqueKey = async (data, uniqueKey) => {
    try {

        return await socketDetail.update(data, {
            where: {
                socket_id: uniqueKey
            }
        })
    } catch (e) {
        return e
    }

}
