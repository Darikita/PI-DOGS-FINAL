const { Router } = require('express');
const axios = require ("axios");
const {Temperament} = require('../db');
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// - [X] __GET /temperament__:
// - Obtener todos los temperaments posibles
// - En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

router.get("/temperaments", async function (req, res) {    
    try {
    const dataApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    //MAPEO LOS TEMPERAMENTOS DE LA API Y LOS GUARDO EN TEMPERAMENT
    let temperaments = dataApi.data.map((el) => el.temperament);
   //JUNTO EL ARRAY DE TEMPERAMENTOS EN UN STRING Y LO VUELVO A DIVIDIR EN UN ARRAY
    temperaments = temperaments.join(", ").split(", ");
   //FILTRO LOS VACIOS
    temperaments = temperaments.filter((el) => el);
    // CREO UN NUEVO TEMPERAMENTO EN LA TABLA POR CADA ELEMENTO 
    temperaments.forEach((el) => {
        Temperament.findOrCreate({
        where: { name: el },
    });
  });
  //TRAIGO TODOS LOS TEMPERAMENTOS 
  const allTemperament = await Temperament.findAll({ order:[ [ 'name','ASC' ] ] });
  res.send(allTemperament);
} catch{ 
    res.send("Error")
}
});
    
 module.exports = router;