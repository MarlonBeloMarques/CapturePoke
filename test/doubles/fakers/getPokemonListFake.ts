import { faker } from "@faker-js/faker";

const getPokemonListFake = (length: number) => {
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
