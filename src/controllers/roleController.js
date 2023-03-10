import roleService from "../services/roleService"

exports.getRole = async (req, res) => {
    let result = await roleService.getRole();
    return res.status(200).json(result);
}

exports.setRole = async (req, res) => {
    let data = req.body;
    let result = await roleService.setRole(data);
    if (!result.errCode) {
        return res.status(200).json(result);
    }
    return res.status(202).json(result);
}

exports.createRole = async (req, res) => {
    let name = req.body.name;
    let result = await roleService.createRole(name);
    if (!result.errCode) {
        return res.status(200).json(result);
    }
    return res.status(202).json(result);
}

exports.deleteRole = async (req, res) => {
    let id = req.query.id;
    let result = await roleService.deleteRole(id);
    if (!result.errCode) {
        return res.status(200).json(result);
    }
    return res.status(202).json(result);
}

