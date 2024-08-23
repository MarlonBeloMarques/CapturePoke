const baseUrl = "https://pokeapi.co/api/v2/pokemon";
const baseUrlWithParamId = (id: number) => baseUrl + "/" + id;
const urlPicture =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
const urlSpecies = "https://pokeapi.co/api/v2/pokemon-species/";
const Url = {
  baseUrl,
  urlPicture,
  baseUrlWithParamId,
  urlSpecies,
};

export default Url;
