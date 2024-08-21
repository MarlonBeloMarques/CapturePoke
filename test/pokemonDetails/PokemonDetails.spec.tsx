import { render, screen } from "@testing-library/react-native";
import getNameFake from "../doubles/fakers/getNameFake";
import { ThemedText } from "@/src/global/components/ThemedText";

describe("PokemonDetails: ", () => {
  test("should show pokemon name with success", () => {
    const name = getNameFake();
    render(<PokemonDetails name={name} />);

    expect(screen.getByText(name)).toBeTruthy();
  });

  test("should not show pokemon name if its undefined", () => {
    const name = undefined;
    render(<PokemonDetails name={name!} />);

    expect(screen.queryByTestId("pokemon_name_id")).not.toBeTruthy();
  });
});

type PokemonDetailsViewModel = {
  name: string;
};

const PokemonDetails = ({ name }: PokemonDetailsViewModel) => {
  return (
    <>{name && <ThemedText testID="pokemon_name_id">{name}</ThemedText>}</>
  );
};
