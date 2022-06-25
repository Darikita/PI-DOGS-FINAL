const { Router } = require("express");
const apiInfo = require("../controllers/getApiInfo");
const { Temperament } = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  let allTemperaments = await Temperament.findAll();

  if (allTemperaments.length === 0) {
    let temperamentsRepeated = [];
    const dogsApi = await apiInfo();

    dogsApi.forEach((dog) => {
      temperamentsRepeated = temperamentsRepeated.concat(dog.temperament);
    });

    const uniqueTemperaments = temperamentsRepeated.filter((temp, index) => {
      return temperamentsRepeated.indexOf(temp) === index;
    });

    const temperamentsToInsert = uniqueTemperaments.map((temp) => {
      return {
        name: temp,
      };
    });

    allTemperaments = await Temperament.bulkCreate(temperamentsToInsert);
  }

  return res.status(200).send(allTemperaments);
});

module.exports = router;
