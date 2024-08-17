import { faker } from "@faker-js/faker";

const getPictureFake = () => {
  return faker.image.url();
};

export default getPictureFake;
