import db from "../models/index"
import response from "../Validators/responseDataMessage"
import hashPass from "../Validators/hashPass"
import jwt from "jsonwebtoken"
import isTokenExpired from "../Validators/checkToken"
import email from '../Validators/mail'

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
                email.loginMail(data.gmail, data.name, data.age)
                rs.setResponseAll(0, "Account created successfully, please activate your account via gmail")
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
                        activated: 0,
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
            if (!gmail) {
                rs.setResponseAll(2, "Account not found")
            }
            if (!gmail.activated) {
                rs.setResponseAll(2, "Please activate your account first")
            }
            if (gmail && gmail.activated) {
                let checkpoint = await hashPass.compareHash(data.password, gmail.password)
                if (!checkpoint) {
                    rs.setResponseAll(3, "Wrong password")
                }
                if (gmail.refreshToken == "New account" && checkpoint) {

                    rs.setResponseAll(0, "Login successfully")
                    newData.accessToken = jwt.sign({
                        id: gmail.id,
                        gmail: data.gmail,

                    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
                    newData.refreshToken = jwt.sign({
                        id: gmail.id,
                        gmail: data.gmail,

                    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '720h' });
                    await db.User.update(
                        {
                            refreshToken: newData.refreshToken,
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
                    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
                    newData.refreshToken = gmail.refreshToken
                    await db.User.update(
                        {
                            accessToken: newData.accessToken,
                        },
                        { where: { id: gmail.id } },
                    )
                    if (isTokenExpired(gmail.refreshToken)) {
                        newData.refreshToken = jwt.sign({
                            id: gmail.id,
                            gmail: data.gmail,
                        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '720h' });

                        await db.User.update(
                            {
                                refreshToken: newData.refreshToken,
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
                errMessage: "Invalid Token"
            }
            let token = data.split(" ")[1]
            let bear = data.split(" ")[0]
            const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
            let checkpoint = await db.User.findOne({
                where: { id: decode.id }
            })

            if (!checkpoint.activated) {
                result.errMessage = "Please activate your account through gmail first"
            }

            if (checkpoint && !isTokenExpired(token) && checkpoint.refreshToken == token && bear == "bearer" && checkpoint.activated) {
                let accessToken = jwt.sign({
                    id: decode.id,
                    gmail: decode.gmail,
                }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
                await db.User.update(
                    { accessToken: accessToken },
                    { where: { id: decode.id } }
                )
                result.errCode = 0
                result.accessToken = accessToken
                if (result.errMessage.length > 15) {
                    result.errMessage = result.errMessage + " and generated new access token"
                }
                else {
                    result.errMessage = "Generated new access token"
                }
            }

            resolve(result);
        } catch (error) {
            resolve({
                errCode: 1,
                errMessage: "Invalid token"
            })

        }
    });
}

exports.activated = async (gmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = {
                errCode: 1,
            }

            let checkpoint = await db.User.findOne({
                where: { gmail: gmail }
            })

            if (checkpoint && !checkpoint.activated) {
                await db.User.update({ activated: 1 }, { where: { gmail: gmail } })
            }
            else {
                result.errCode = 0
            }

            resolve(result);
        } catch (error) {
            resolve({
                errCode: 1,
                errMessage: "Invalid token"
            })

        }
    });
}


// activated