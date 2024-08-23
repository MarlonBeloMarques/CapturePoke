import { Pokemon } from "@/src/pokemonList/domain/PokemonList";
import { faker } from "@faker-js/faker";

const getPokemonListFake = (length: number): Pokemon[] => {
  const list = [];
  for (let index = 0; index < length; index++) {
    list.push({
      id: faker.number.int(),
      name: faker.word.sample(),
      picture: faker.image.url(),
    });
  }

  return list;
};

export default getPokemonListFake;
