import addressService from "../services/addressService"

exports.getAddress = async (req, res) => {
    let result = await addressService.getAddress();
    return res.status(200).json(result);
}

exports.setAddress = async (req, res) => {
    let data = req.body;
    let result = await addressService.setAddress(data);
    if (!result.errCode) {
        return res.status(200).json(result);
    }
    return res.status(202).json(result);
}

exports.createAddress = async (req, res) => {
    let name = req.body.name;
    let result = await addressService.createAddress(name);
    if (!result.errCode) {
        return res.status(200).json(result);
    }
    return res.status(202).json(result);
}

exports.deleteAddress = async (req, res) => {
    let id = req.query.id;
    let result = await addressService.deleteAddress(id);
    if (!result.errCode) {
        return res.status(200).json(result);
    }
    return res.status(202).json(result);
}

