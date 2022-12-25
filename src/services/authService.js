import db from "../models/index"
import response from "../Validators/responseDataMessage"
import hashPass from "../Validators/hashPass"
import jwt from "jsonwebtoken"
import isTokenExpired from "../Validators/checkToken"

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
            if (oldData) {
                rs.setResponseAll(4, "Account is already exist")
            }
            let fileuId = data.genderId == 1 ? 1 : 2
            if (!oldData && checkPointGender && checkPointAddress) {
                rs.setResponseAll(0, "Account created successfully")
                let hash = await hashPass.hash(data.password);

                await db.User.create(
                    {
                        name: data.name,
                        age: data.age,
                        status: 1,
                        gmail: data.gmail,
                        coin: 0,
                        purchaseCoin: 0,
                        password: hash,
                        accessToken: "New Account",
                        refreshToken: "New account",
                        expire: Date.now(),
                        fileuId: fileuId,
                        roleId: 2,
                        addressId: data.addressId,
                        genderId: data.genderId,
                    }
                );
            }

            resolve(rs.getResponse());
        } catch (error) {
            reject(error)
        }
    });
}

exports.login = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newData = {
                accessToken: 0,
                refreshToken: 0
            }
            let rs = new response()
            let gmail = await db.User.findOne({
                where: { gmail: data.gmail }
            })
            var pre = new Date(gmail.expire)
            var now = new Date()
            if (!gmail) {
                rs.setResponseAll(2, "Account not found")
            }

            if ((Math.abs(now - pre) / 1000 / 60) < 0.20) {
                rs.setResponseAll(2, `Login to fast waiting ${((0.20 - (Math.abs(now - pre) / 1000 / 60)).toFixed(2)) * 100}s left`)
            }
            if (gmail && ((Math.abs(now - pre) / 1000 / 60) >= 0.20)) {
                let role = await db.Role.findOne({
                    where: { id: gmail.roleId }
                })
                let checkpoint = await hashPass.compareHash(data.password, gmail.password)

                if (!checkpoint) {
                    rs.setResponseAll(3, "Wrong password")
                }
                if (gmail.refreshToken == "New account" && checkpoint) {

                    rs.setResponseAll(0, "Login successfully")
                    newData.accessToken = jwt.sign({

                        id: gmail.id,
                        gmail: data.gmail,
                        role: role.name

                    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
                    newData.refreshToken = jwt.sign({

                        id: gmail.id,
                        gmail: data.gmail,
                        role: role.name

                    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '720h' });

                    await db.User.update(
                        {
                            refreshToken: newData.refreshToken,
                            expire: new Date(),
                            accessToken: newData.accessToken
                        },
                        { where: { id: gmail.id } },
                    )
                }

                if (checkpoint && gmail.refreshToken != "New account") {
                    //milo giay phut gio ngay n/1000/60/60/24
                    rs.setResponseAll(0, "Login successfully")
                    newData.accessToken = jwt.sign({

                        id: gmail.id,
                        gmail: data.gmail,
                        role: role.name

                    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
                    newData.refreshToken = gmail.refreshToken
                    await db.User.update(
                        {
                            accessToken: newData.accessToken,
                            expire: new Date()
                        },
                        { where: { id: gmail.id } },
                    )
                    if (isTokenExpired(gmail.refreshToken)) {
                        newData.refreshToken = jwt.sign({

                            id: gmail.id,
                            gmail: data.gmail,
                            role: role.name

                        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '720h' });

                        await db.User.update(
                            {
                                refreshToken: newData.refreshToken,
                                expire: new Date()
                            },
                            { where: { id: gmail.id } },
                        )
                    }
                }
            }

            resolve(rs.getResponseLogin(newData));
        } catch (error) {
            reject(error)
        }
    });
}

exports.refreshTK = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = {
                errCode: 1,
                errMessage: "Refresh error"
            }
            let token = data.split(" ")[1]
            const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
            let checkpoint = await db.User.findOne({
                where: { id: decode.id }
            })

            if (checkpoint && !isTokenExpired(token)) {
                let accessToken = jwt.sign({
                    id: decode.id,
                    gmail: decode.gmail,
                    role: decode.role
                }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' });
                await db.User.update(
                    { accessToken: accessToken },
                    { where: { id: decode.id } }
                )
                result.errCode = 0
                result.errMessage = "Generated new access token"
                result.accessToken = accessToken
            }

            resolve(result);
        } catch (error) {
            reject(error)
        }
    });
}
