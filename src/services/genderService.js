import db from "../models/index"
import response from "../Validators/responseDataMessage"

exports.getGender = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Gender.findAll(
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

exports.setGender = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rs = new response();

            if (data.id && data.name) {
                let gender = await db.Gender.findOne(
                    {
                        where: { id: data.id }
                    }
                )

                let checkpoint = await db.Gender.findOne(
                    { where: { name: data.name } }
                )

                if (gender && gender.name != data.name && !checkpoint && data.id > 2) {
                    rs.setResponseSuccess("Gender updated successfully");
                    await db.Gender.update(
                        {
                            name: data.name
                        },
                        {
                            where: { id: data.id }
                        })
                } else {
                    rs.setResponseFail("Can not update gender");
                }
            }

            resolve(rs.getResponse());
        } catch (error) {
            reject(error)
        }
    });
}

exports.createGender = async (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rs = new response();

            if (name) {
                let gender = await db.Gender.findOne(
                    {
                        where: { name: name }
                    }
                )
                if (!gender) {
                    rs.setResponseSuccess("Gender create successfully");
                    await db.Gender.create(
                        { name: name }
                    );
                }
                else {
                    rs.setResponseFail("Can not create gender");
                }
            }

            resolve(rs.getResponse());
        } catch (error) {
            reject(error)
        }
    });
}

exports.deleteGender = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rs = new response();
            if (id) {
                let gender = await db.Gender.findOne(
                    {
                        where: { id: id }
                    }
                );
                if (gender && id > 2) {
                    rs.setResponseSuccess("Delete gender successfully");
                    await db.Gender.destroy(
                        {
                            where: { id: id }
                        }
                    )
                }
                else {
                    rs.setResponseFail("Can not delete gender");
                }
            }

            resolve(rs.getResponse());
        } catch (error) {
            reject(error)
        }
    });
}