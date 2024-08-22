import { render, screen } from "@testing-library/react-native";
import getNameFake from "../doubles/fakers/getNameFake";
import { ThemedText } from "@/src/global/components/ThemedText";
import getPictureFake from "../doubles/fakers/getPictureFake";
import { Image } from "react-native";

describe("PokemonDetails: ", () => {
  test("should show pokemon name with success", () => {
    const name = getNameFake();
    render(
      <PokemonDetails
        name={name}
        picture=""
        abilities={[]}
        types={[]}
        specie={{
          name: "",
          species: [],
        }}
      />,
    );

    expect(screen.getByText(name)).toBeTruthy();
  });

  test("should not show pokemon name if its undefined", () => {
    const name = undefined;
    render(
      <PokemonDetails
        name={name!}
        picture=""
        abilities={[]}
        types={[]}
        specie={{
          name: "",
          species: [],
        }}
      />,
    );

    expect(screen.queryByTestId("pokemon_name_id")).not.toBeTruthy();
  });

  test("should show pokemon picture with success", () => {
    const picture = getPictureFake();
    render(
      <PokemonDetails
        name={""}
        picture={picture}
        abilities={[]}
        types={[]}
        specie={{
          name: "",
          species: [],
        }}
      />,
    );

    expect(screen.getByTestId("pokemon_picture_id").props.source.uri).toEqual(
      picture,
    );
  });

  test("should not show pokemon picture if its undefined", () => {
    const picture = undefined;
    render(
      <PokemonDetails
        name={""}
        picture={picture!}
        abilities={[]}
        types={[]}
        specie={{
          name: "",
          species: [],
        }}
      />,
    );

    expect(screen.queryByTestId("pokemon_picture_id")).not.toBeTruthy();
  });

  test("should show the pokemon abilities correctly", () => {
    const abilities = ["overgrow", "chlorophyll"];
    render(
      <PokemonDetails
        name={""}
        picture={""}
        abilities={abilities}
        types={[]}
        specie={{
          name: "",
          species: [],
        }}
      />,
    );

    expect(screen.getByText("Abilities")).toBeTruthy();
    abilities.forEach((ability) => {
      expect(screen.getByText(ability)).toBeTruthy();
    });
  });

  test.each([null, []])(
    "should not show the pokemon abilities if abilities are empty",
    (abilities) => {
      render(
        <PokemonDetails
          name={""}
          picture={""}
          abilities={abilities!}
          types={[]}
          specie={{
            name: "",
            species: [],
          }}
        />,
      );

      expect(screen.queryByText("Abilities")).not.toBeTruthy();
    },
  );

  test("should show the pokemon types correctly", () => {
    const types = ["grass", "poison"];
    render(
      <PokemonDetails
        name={""}
        picture={""}
        abilities={[]}
        types={types}
        specie={{
          name: "",
          species: [],
        }}
      />,
    );

    expect(screen.getByText("Types")).toBeTruthy();
    types.forEach((type) => {
      expect(screen.getByText(type)).toBeTruthy();
    });
  });

  test.each([null, []])(
    "should not show the pokemon types if types are empty",
    (types) => {
      render(
        <PokemonDetails
          name={""}
          picture={""}
          abilities={[]}
          types={types!}
          specie={{
            name: "",
            species: [],
          }}
        />,
      );

      expect(screen.queryByText("Abilities")).not.toBeTruthy();
    },
  );

  test("should show the pokemon species correctly", () => {
    const specie = { name: "monster", species: ["bulbasaur", "ivysaur"] };
    render(
      <PokemonDetails
        name={""}
        picture={""}
        abilities={[]}
        types={[]}
        specie={specie}
      />,
    );

    expect(screen.getByText(specie.name)).toBeTruthy();
    specie.species.forEach((specie) => {
      expect(screen.getByText(specie)).toBeTruthy();
    });
  });

  test.each([null, { name: "", species: [] }])(
    "should not show the pokemon species if types are empty",
    (specie) => {
      render(
        <PokemonDetails
          name={""}
          picture={""}
          abilities={[]}
          specie={specie!}
          types={[]}
        />,
      );

      expect(screen.queryByTestId("pokemon_specie_id")).not.toBeTruthy();
    },
  );
});

type PokemonDetailsViewModel = {
  name: string;
  picture: string;
  abilities: string[];
  types: string[];
  specie: { name: string; species: string[] };
};

const PokemonDetails = ({
  name,
  picture,
  abilities,
  types,
  specie,
}: PokemonDetailsViewModel) => {
  return (
    <>
      {name && <ThemedText testID="pokemon_name_id">{name}</ThemedText>}
      {picture && (
        <Image testID="pokemon_picture_id" source={{ uri: picture }} />
      )}
      {abilities && abilities.length > 0 && <ThemedText>Abilities</ThemedText>}
      {abilities &&
        abilities.map((ability, index) => (
          <ThemedText key={index}>{ability}</ThemedText>
        ))}
      {types && types.length > 0 && <ThemedText>Types</ThemedText>}
      {types &&
        types.map((type, index) => <ThemedText key={index}>{type}</ThemedText>)}
      {specie && specie.name && (
        <ThemedText testID="pokemon_specie_id">{specie.name}</ThemedText>
      )}
      {specie &&
        specie.species &&
        specie.species.map((specie, index) => (
          <ThemedText key={index}>{specie}</ThemedText>
        ))}
    </>
  );
};
