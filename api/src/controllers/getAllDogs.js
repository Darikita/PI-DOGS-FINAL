const getApiInfo = require("./getApiInfo");
const getDbInfo = require("./getDbInfo");

module.exports = async function getAllDogs() {
  const infoApi = await getApiInfo();
  const infoDb = await getDbInfo();
  const allDogs = infoDb.concat(infoApi);
  return allDogs;
};
