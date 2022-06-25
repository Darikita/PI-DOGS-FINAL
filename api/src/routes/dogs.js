const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const getAllDogs = require("../controllers/getAllDogs");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const allDogs = await getAllDogs();

    if (name) {
      const filtrado = allDogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      if (filtrado.length) return res.status(200).send(filtrado);
      return res.status(404).send("La raza ingresada no ha sido encontrada");
    }
    return res.status(200).send(allDogs);
  } catch (e) {
    return res.status(404).json(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const allDogs = await getAllDogs();
      const filtered = allDogs.filter((dog) => dog.id == id);
      if (filtered.length > 0) return res.status(200).send(filtered);
      return res.status(404).send("El id no se encontro");
    }
  } catch (e) {
    console.log(e);
    return res.status(404).json(e);
  }
});

router.post("/new", async (req, res) => {
  try {
    const {
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      lifeSpanMin,
      lifeSpanMax,
      temperament,
      img,
    } = req.body;

    const createdDog = await Dog.create({
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      lifeSpanMin,
      lifeSpanMax,
      img,
    });

    let temperamentDB = await Temperament.findAll({
      where: { name: temperament },
    });

    createdDog.addTemperament(temperamentDB);

    return res.status(201).send("Se creo correctamente");
  } catch (err) {
    console.log("ERROR", err);
    res.status(404).json(err);
  }
});

module.exports = router;
