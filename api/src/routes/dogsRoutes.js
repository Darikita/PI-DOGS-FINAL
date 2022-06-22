const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//------------------------------GET---------------------------

//traer la informacion desde la api
const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiInfo = await apiUrl.data.map((e) => {
      return {
        name: e.name,
        id: e.id,
        height:e.height.metric,
        weight:e.weight.metric,
        life_span:e.life_span,
        temperament: e.temperament ? e.temperament : "Unknown",
        image: e.image.url,
      };
    });
    return apiInfo;
  } catch (error) {
    console.log("ERROR IN getApiInfo", error);
  }
};

//traer la informacion desde la db
const getDBinfo = async () => {
  try {
    const perros = await Dog.findAll({
      include: Temperament,
    });
    const info = perros.map((e) => {
      let temp = e.temperaments.map((e) => e.name);
      let tempAux = temp.join(", ");
      return {
        name: e.name,
        id: e.id,
        userCreated: e.userCreated,
        height: e.height,
        weight: e.weight,
        life_span: e.life_span,
        temperament: tempAux,
        image: e.image
          ? e.image
          : "https://i.pinimg.com/564x/33/9e/96/339e966e74f476c8531a9f91b60e514c--dogs-in-costumes-animal-costumes.jpg",
      };
    });
    //console.log(info)
    return info;
  } catch (error) {
    console.log("ERROR IN getDBInfo", error);
  }
};
//concateno ambas fuentes de informacion
const getAllDogs = async () => {
  try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBinfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
  } catch (error) {
    console.log("ERROR IN infoTotal", error);
  }
};

//  __GET /dogs__:
// - Obtener un listado de las razas de perro
// - Debe devolver solo los datos necesarios para la ruta principal
// - __GET /dogs?name="..."__:
// - Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// - Si no existe ninguna raza de perro mostrar un mensaje adecuado

router.get('/dogs', async (req,res) => {
  const name = req.query.name
  let dogTotal = await getAllDogs ();
  if (name){
      let dogName = await dogTotal.filter(el => 
          el.name.toLowerCase().includes(name.toLowerCase()))
      dogName.length ? 
      res.status(200).send(dogName) :
      res.status(404).send('Doggie not found!');
  } else {
      res.status(200).send(dogTotal)
  }
})

// //  __GET /dogs/{idRaza}__:

router.get('/dogs/:id', async (req,res) => {
  const id = req.params.id;
  const dogsTotal = await getAllDogs()
  if (id){
    let dogId = await dogsTotal.filter(el => el.id == id)
    dogId.length? 
    res.status(200).json(dogId):
    res.status(404).send('Doggie not found!')
  }
})
////----------------------------------POST-------------------------------

// router.post("/dog", async (req, res, next) => {
//   try {
//     let {name, height, weight, life_span, image, temperament} = req.body;
//     const newDog = await Dog.create({
//       name,
//       height,
//       weight,
//       life_span,
//     });
//    await newDog.addTemperament(temperament);
//     res.status(201).json(newDog);
//   } catch (error) {
//     next(error);
//   }
// });
router.post("/dog", async function (req, res,){
    const {name, height, weight, life_span, image, temperament,  userCreated} = req.body;
    const newDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image,
      userCreated
    });

    let temperamentOnDb = await Temperament.findAll({
      where: {
        name: temperament
      }})

   newDog.addTemperament(temperamentOnDb)
    res.send('Dog created Succesfully!!')
  
});
module.exports = router;
