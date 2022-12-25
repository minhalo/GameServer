import authService from "../services/authService"
import { isNumeric, isGmail, isPassword } from "../Validators/checkString"

exports.test = async (req, res) => {
    return res.status(200).json({ teset: "hi minh" });
}

exports.register = async (req, res) => {
    let data = req.body;
    if (!data.name) {
        return res.status(203).json({
            errCode: 2,
            errMessage: "Name must be provided"
        });
    }
    if (data.name.length < 6) {
        return res.status(203).json({
            errCode: 2,
            errMessage: "Name must have at least 6 characters"
        });
    }
    if (isNumeric(data.name)) {
        return res.status(203).json({
            errCode: 2,
            errMessage: "Name can not be a number"
        });
    }

    if (!data.age) {
        return res.status(203).json({
            errCode: 3,
            errMessage: "Age must be provided"
        });
    }

    if (!isNumeric(data.age) || data.age <= 0) {
        return res.status(203).json({
            errCode: 3,
            errMessage: "Age must be a positive number"
        });
    }

    if (!data.gmail) {
        return res.status(203).json({
            errCode: 4,
            errMessage: "Gmail must be provided"
        });
    }

    if (!isGmail(data.gmail)) {
        return res.status(203).json({
            errCode: 4,
            errMessage: "Gmail must be email format"
        });
    }

    if (!data.password) {
        return res.status(203).json({
            errCode: 5,
            errMessage: "Password must be provided"
        });
    }

    if (!isPassword(data.password)) {
        return res.status(203).json({
            errCode: 5,
            errMessage: "Password must be at least 8 characters, including uppecase, lowercase, numbers and special characters"
        });
    }

    if (!data.addressId) {
        return res.status(203).json({
            errCode: 6,
            errMessage: "AddressID must be provided"
        });
    }

    if (!data.genderId) {
        return res.status(203).json({
            errCode: 7,
            errMessage: "GenderId must be provided"
        });
    }
    let result = await authService.register(data);
    return res.status(200).json(result);
}

exports.login = async (req, res) => {
    let data = req.body;
    if (!data.gmail) {
        return res.status(203).json({
            errCode: 2,
            errMessage: "Gmail must be provided"
        });
    }
    if (!isGmail(data.gmail)) {
        return res.status(203).json({
            errCode: 2,
            errMessage: "Gmail must be email format"
        });
    }
    if (!data.password) {
        return res.status(203).json({
            errCode: 3,
            errMessage: "Password must be provided"
        });
    }
    let result = await authService.login(data);
    return res.status(200).json(result);
}

exports.refreshTK = async (req, res) => {
    let data = req.body.authorization;

    let result = await authService.refreshTK(data);
    return res.status(200).json(result);
}
