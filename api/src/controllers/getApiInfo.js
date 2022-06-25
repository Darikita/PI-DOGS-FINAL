const axios = require("axios");
const API_KEY = process.env;

module.exports = async function getApiInfo() {
  const apiInfo = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const list = await apiInfo.data.map((dog) => {
    return {
      name: dog.name,
      lifeSpan: dog.life_span,
      id: dog.id,
      height: dog.height.metric,
      weight: dog.weight.metric,
      temperament: [dog.temperament]
        .join()
        .split(",")
        .map((dog) => dog.trim()),
      img: dog.image.url,
    };
  });
  return list;
};
