import db from "../models/index"
import jwt from "jsonwebtoken"

exports.adminFireWallbody = async (req, res, next) => {
    let authorization = req.body.authorization
    if (authorization) {
        let token = authorization.split(" ")[1]
        try {
            const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            let checkpoint = await db.User.findOne({
                where: { id: decode.id }
            })

            if (checkpoint && checkpoint.accessToken == token && decode.role == "Admin") {
                next()
            }
            else {
                return res.status(401).json("You do not have permission to access this action");
            }

        } catch (error) {
            return res.status(401).json("Invalid token");
        }
    }
    else {
        return res.status(401).json("You do not have permission to access this action because you do not provide a token");
    }
}

exports.adminFireWallheader = async (req, res, next) => {
    let authorization = req.headers['authorization'];
    if (authorization) {
        let token = authorization.split(" ")[1]
        try {
            const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            let checkpoint = await db.User.findOne({
                where: { id: decode.id }
            })

            if (checkpoint && checkpoint.accessToken == token && decode.role == "Admin") {
                next()
            }
            else {
                return res.status(401).json("You do not have permission to access this action");
            }

        } catch (error) {
            return res.status(401).json("Invalid token");
        }
    }
    else {
        return res.status(401).json("You do not have permission to access this action because you do not provide a token");
    }
}