import db from "../models/index"
import jwt from "jsonwebtoken"
import sql from "../config/connectDB"
const { QueryTypes } = require('sequelize');


exports.me = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const data = await db.sequelize.query(`SELECT Users.name, Roles.name AS role, Users.age, Genders.name AS gender, Addresses.name AS address, Fileus.path AS image_path, Users.gmail, Users.coin, Users.purchaseCoin FROM Users LEFT JOIN Roles ON Users.roleId = Roles.id LEFT JOIN Genders ON Users.genderId = Genders.id LEFT JOIN Addresses ON Users.addressId = Addresses.id LEFT JOIN Fileus ON Users.fileuId = Fileus.id WHERE Users.id = ${decode.id}`, { type: QueryTypes.SELECT });

            // let data = await db.User.findAll(
            //     {
            //         include: [
            //             {
            //                 model: db.Role,
            //                 as: 'role',
            //                 required: true,
            //                 attributes: ['name'],
            //             },
            //             {
            //                 model: db.Address,
            //                 as: 'address',
            //                 required: true,
            //                 attributes: ['name'],
            //             },
            //             {
            //                 model: db.Fileu,
            //                 as: 'file',
            //                 required: true,
            //                 attributes: ['path'],
            //             },
            //             {
            //                 model: db.Gender,
            //                 as: 'gender',
            //                 required: true,
            //                 attributes: ['name'],
            //             },
            //         ],
            //         where: { id: decode.id },

            //         attributes: { exclude: ['createdAt', 'updatedAt', 'accessToken', 'refreshToken', 'password', 'expire', 'status', 'roleId', 'addressId', 'fileuId', 'genderId', 'id'] },
            //         raw: true,
            //         nest: false
            //     },


            // );
            resolve(data[0]);
        } catch (error) {
            reject(error)
        }
    });
}