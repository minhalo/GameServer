import db from "../models/index"

exports.create = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.sequelize.sync();
            resolve("Create database successfully");
        } catch (error) {
            reject(error)
        }
    });
}

exports.drop = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.sequelize.drop();
            resolve("Drop database successfully");
        } catch (error) {
            reject(error)
        }
    });
}
