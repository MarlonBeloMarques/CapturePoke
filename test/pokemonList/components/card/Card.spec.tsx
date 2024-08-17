import { ThemedText } from "@/src/global/components/ThemedText";
import { ThemedView } from "@/src/global/components/ThemedView";
import { render, screen } from "@testing-library/react-native";
import { faker } from "@faker-js/faker";

describe("PokemonList: Card", () => {
  test("should show pokemon name with success", () => {
    const name = faker.word.sample();
    render(<Card name={name} />);

    expect(screen.getByText(name)).toBeTruthy();
  });

  test.each(["", undefined, null])("should not show pokemon name", (name) => {
    render(<Card name={name!} />);

    expect(screen.queryByTestId("name_id")).not.toBeTruthy();
  });
});

type Props = {
  name: string;
};

const Card = ({ name }: Props) => {
  return (
    <ThemedView>
      {name && <ThemedText testID="name_id">{name}</ThemedText>}
    </ThemedView>
  );
};
