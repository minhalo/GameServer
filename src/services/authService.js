import db from "../models/index"
import response from "../Validators/responseDataMessage"

exports.register = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let oldData = await db.User.findOne(
                {
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    where: { gmail: data.gmail }
                }
            );

            let checkPointGender = await db.Gender.findOne({
                where: { id: data.genderId }
            })

            let checkPointAddress = await db.Address.findOne({
                where: { id: data.addressId }
            })

            let rs = new response();

            if (!checkPointAddress) {
                rs.setResponseAll(6, "Address not found")
            }
            if (!checkPointGender) {
                rs.setResponseAll(7, "Gender not found")
            }
            if (!oldData && checkPointGender && checkPointAddress) {
                rs.setResponseAll(0, "Account created successfully")

            }

            resolve(rs.getResponse());
        } catch (error) {
            reject(error)
        }
    });
}