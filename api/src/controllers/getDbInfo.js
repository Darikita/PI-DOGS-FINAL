const { Dog } = require("../db");
const { Temperament } = require("../db");

module.exports = async function getDbInfo() {
  const infoDb = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return infoDb;
};
