import db from "../models/index"
import jwt from "jsonwebtoken"

exports.userFireWallheader = async (req, res, next) => {
    let authorization = req.headers['authorization'];

    if (authorization) {
        let token = authorization.split(" ")[1]
        let bear = authorization.split(" ")[0]
        try {
            const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            let checkpoint = await db.User.findOne({
                where: { id: decode.id }
            })

            let role = await db.Role.findOne({
                where: { id: checkpoint.roleId }
            })

            if (checkpoint && checkpoint.accessToken == token && role && bear == "Bearer") {
                next()
            }
            else {
                return res.status(401).json("You do not have permission to access this action");
            }
        } catch (e) {
            return res.status(401).json("Invalid token");
        }
    }
    else {
        return res.status(401).json("You do not have permission to access this action because you do not provide a token");
    }
}