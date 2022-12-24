import databaseService from "../services/databaseService"

exports.dbCreate = async (req, res) => {
    let result = await databaseService.create();
    return res.status(200).json(result)
}

exports.dbDrop = async (req, res) => {
    let result = await databaseService.drop();
    return res.status(200).json(result)
}

