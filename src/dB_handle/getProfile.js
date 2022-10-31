import db from "../models/index"

let getProfile = (token) => {
  return new Promise(async (resolve, reject) => {
    try {

      // const users = await db.User.findOne({
      //   where: { token: token },
      //   attributes: { exclude: ['createdAt', 'password', 'updatedAt', 'token', 'RoleId', 'email', 'status'] },

      // })

      const users = await db.sequelize.query(`SELECT Users.image, Users.coin, Users.name, Users.age, Addresses.name as AddressId, Genders.name as GenderId, Users.gmail FROM Users LEFT JOIN Addresses  On Users.AddressId = Addresses.id LEFT JOIN Genders On Users.GenderId = Genders.id where Users.token = '${token}'`);
      var resultArray = Object.values(JSON.parse(JSON.stringify(users[0])))


      resolve(resultArray[0])
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = getProfile
