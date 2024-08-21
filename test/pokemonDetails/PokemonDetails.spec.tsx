import { render, screen } from "@testing-library/react-native";
import getNameFake from "../doubles/fakers/getNameFake";
import { ThemedText } from "@/src/global/components/ThemedText";
import getPictureFake from "../doubles/fakers/getPictureFake";
import { Image } from "react-native";

describe("PokemonDetails: ", () => {
  test("should show pokemon name with success", () => {
    const name = getNameFake();
    render(<PokemonDetails name={name} picture="" />);

    expect(screen.getByText(name)).toBeTruthy();
  });

  test("should not show pokemon name if its undefined", () => {
    const name = undefined;
    render(<PokemonDetails name={name!} picture="" />);

    expect(screen.queryByTestId("pokemon_name_id")).not.toBeTruthy();
  });

  test("should show pokemon picture with success", () => {
    const picture = getPictureFake();
    render(<PokemonDetails name={""} picture={picture} />);

    expect(screen.getByTestId("pokemon_picture_id").props.source.uri).toEqual(
      picture,
    );
  });

  test("should not show pokemon picture if its undefined", () => {
    const picture = undefined;
    render(<PokemonDetails name={""} picture={picture!} />);

    expect(screen.queryByTestId("pokemon_picture_id")).not.toBeTruthy();
  });
});

type PokemonDetailsViewModel = {
  name: string;
  picture: string;
};

const PokemonDetails = ({ name, picture }: PokemonDetailsViewModel) => {
  return (
    <>
      {name && <ThemedText testID="pokemon_name_id">{name}</ThemedText>}
      {picture && (
        <Image testID="pokemon_picture_id" source={{ uri: picture }} />
      )}
    </>
  );
};
