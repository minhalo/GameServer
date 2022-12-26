import userService from "../services/userService"

exports.me = async (req, res) => {
    let authorization = req.headers['authorization'];
    let token = authorization.split(" ")[1]
    let result = await userService.me(token)
    return res.status(200).json(result)
}