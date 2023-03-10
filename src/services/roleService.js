import db from "../models/index"
import response from "../Validators/responseDataMessage"

exports.getRole = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Role.findAll(
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

exports.setRole = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rs = new response();

            if (data.id && data.name) {
                let role = await db.Role.findOne(
                    {
                        where: { id: data.id }
                    }
                )

                let checkpoint = await db.Role.findOne(
                    { where: { name: data.name } }
                )

                if (role && role.name != data.name && !checkpoint && data.id > 2) {
                    rs.setResponseSuccess("Role updated successfully");
                    await db.Role.update(
                        {
                            name: data.name
                        },
                        {
                            where: { id: data.id }
                        })
                } else {
                    rs.setResponseFail("Can not update role");
                }
            }

            resolve(rs.getResponse());
        } catch (error) {
            reject(error)
        }
    });
}

exports.createRole = async (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rs = new response();

            if (name) {
                let role = await db.Role.findOne(
                    {
                        where: { name: name }
                    }
                )
                if (!role) {
                    rs.setResponseSuccess("Role create successfully");
                    await db.Role.create(
                        { name: name }
                    );
                }
                else {
                    rs.setResponseFail("Can not create role");
                }
            }

            resolve(rs.getResponse());
        } catch (error) {
            reject(error)
        }
    });
}

exports.deleteRole = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rs = new response();
            if (id) {
                let role = await db.Role.findOne(
                    {
                        where: { id: id }
                    }
                );
                if (role && id > 2) {
                    rs.setResponseSuccess("Delete role successfully");
                    await db.Role.destroy(
                        {
                            where: { id: id }
                        }
                    )
                }
                else {
                    rs.setResponseFail("Can not delete role");
                }
            }

            resolve(rs.getResponse());
        } catch (error) {
            reject(error)
        }
    });
}