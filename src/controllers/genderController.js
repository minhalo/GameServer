import genderService from "../services/genderService"

exports.getGender = async (req, res) => {
  let result = await genderService.getGender();
  return res.status(200).json(result);
}

exports.setGender = async (req, res) => {
  let data = req.body;
  let result = await genderService.setGender(data);
  if (!result.errCode) {
    return res.status(200).json(result);
  }
  return res.status(202).json(result);
}

exports.createGender = async (req, res) => {
  let name = req.body.name;
  let result = await genderService.createGender(name);
  if (!result.errCode) {
    return res.status(200).json(result);
  }
  return res.status(202).json(result);
}

exports.deleteGender = async (req, res) => {
  let id = req.query.id;
  let result = await genderService.deleteGender(id);
  if (!result.errCode) {
    return res.status(200).json(result);
  }
  return res.status(202).json(result);
}

