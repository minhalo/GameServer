import db from "../models/index"
import response from "../Validators/responseDataMessage"

exports.getAddress = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Address.findAll(
                {
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                }
            );
            resolve(data);
        } catch (error) {
            reject(error)
        }
    });
}

exports.setAddress = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rs = new response();

            if (data.id && data.name) {
                let address = await db.Address.findOne(
                    {
                        where: { id: data.id }
                    }
                )

                let checkpoint = await db.Address.findOne(
                    { where: { name: data.name } }
                )

                if (address && address.name != data.name && !checkpoint && data.id > 2) {
                    rs.setResponseSuccess("address updated successfully");
                    await db.Address.update(
                        {
                            name: data.name
                        },
                        {
                            where: { id: data.id }
                        })
                } else {
                    rs.setResponseFail("Can not update address");
                }
            }

            resolve(rs.getResponse());
        } catch (error) {
            reject(error)
        }
    });
}

exports.createAddress = async (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rs = new response();

            if (name) {
                let address = await db.Address.findOne(
                    {
                        where: { name: name }
                    }
                )
                if (!address) {
                    rs.setResponseSuccess("address create successfully");
                    await db.Address.create(
                        { name: name }
                    );
                }
                else {
                    rs.setResponseFail("Can not create address");
                }
            }

            resolve(rs.getResponse());
        } catch (error) {
            reject(error)
        }
    });
}

exports.deleteAddress = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rs = new response();
            if (id) {
                let address = await db.Address.findOne(
                    {
                        where: { id: id }
                    }
                );
                if (address && id > 2) {
                    rs.setResponseSuccess("Delete address successfully");
                    await db.Address.destroy(
                        {
                            where: { id: id }
                        }
                    )
                }
                else {
                    rs.setResponseFail("Can not delete address");
                }
            }

            resolve(rs.getResponse());
        } catch (error) {
            reject(error)
        }
    });
}