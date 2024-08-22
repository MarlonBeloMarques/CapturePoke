import { render, screen } from "@testing-library/react-native";
import getNameFake from "../doubles/fakers/getNameFake";
import getPictureFake from "../doubles/fakers/getPictureFake";
import PokemonDetails from "@/src/pokemonDetails/PokemonDetails";

describe("PokemonDetails: ", () => {
  test("should show pokemon name with success", () => {
    const name = getNameFake();
    makeSut({ name });

    expect(screen.getByText(name)).toBeTruthy();
  });

  test("should not show pokemon name if its undefined", () => {
    const name = undefined;
    makeSut({ name: name! });

    expect(screen.queryByTestId("pokemon_name_id")).not.toBeTruthy();
  });

  test("should show pokemon picture with success", () => {
    const picture = getPictureFake();
    makeSut({ picture });

    expect(screen.getByTestId("pokemon_picture_id").props.source.uri).toEqual(
      picture,
    );
  });

  test("should not show pokemon picture if its undefined", () => {
    const picture = undefined;
    makeSut({ picture: picture! });

    expect(screen.queryByTestId("pokemon_picture_id")).not.toBeTruthy();
  });

  test("should show the pokemon abilities correctly", () => {
    const abilities = ["overgrow", "chlorophyll"];
    makeSut({ abilities });

    expect(screen.getByText("Abilities")).toBeTruthy();
    abilities.forEach((ability) => {
      expect(screen.getByText(ability)).toBeTruthy();
    });
  });

  test.each([null, []])(
    "should not show the pokemon abilities if abilities are empty",
    (abilities) => {
      makeSut({ abilities: abilities! });

      expect(screen.queryByText("Abilities")).not.toBeTruthy();
    },
  );

  test("should show the pokemon types correctly", () => {
    const types = ["grass", "poison"];
    makeSut({ types });

    expect(screen.getByText("Types")).toBeTruthy();
    types.forEach((type) => {
      expect(screen.getByText(type)).toBeTruthy();
    });
  });

  test.each([null, []])(
    "should not show the pokemon types if types are empty",
    (types) => {
      makeSut({ types: types! });

      expect(screen.queryByText("Abilities")).not.toBeTruthy();
    },
  );

  test("should show the pokemon species correctly", () => {
    const specie = { name: "monster", species: ["bulbasaur", "ivysaur"] };
    makeSut({ specie });

    expect(screen.getByText(`${specie.name} species`)).toBeTruthy();
    specie.species.forEach((specie) => {
      expect(screen.getByText(specie)).toBeTruthy();
    });
  });

  test.each([null, { name: "", species: [] }])(
    "should not show the pokemon species if types are empty",
    (specie) => {
      makeSut({ specie: specie! });

      expect(screen.queryByTestId("pokemon_specie_id")).not.toBeTruthy();
    },
  );
});

type SutProps = {
  name?: string;
  picture?: string;
  abilities?: string[];
  types?: string[];
  specie?: { name: string; species: string[] };
};

const makeSut = ({
  name = "",
  picture = "",
  abilities = [],
  types = [],
  specie = { name: "", species: [] },
}: SutProps) => {
  return render(
    <PokemonDetails
      name={name}
      picture={picture}
      abilities={abilities}
      specie={specie}
      types={types}
    />,
  );
};
