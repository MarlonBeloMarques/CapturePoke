import { renderHook } from "@testing-library/react-native";

describe("PokemonList: useCard", () => {
  test("should get the name with correct pattern", () => {
    const name = "bulbasaur";
    const { result } = renderHook(() => useCard({ name, picture: "" }));

    expect(result.current.name).toEqual("Bulbasaur");
  });

  test.each(["", null, undefined])("should get the empty name", (name) => {
    const { result } = renderHook(() => useCard({ name: name!, picture: "" }));

    expect(result.current.name).toEqual("");
  });
});

type Props = {
  name: string;
  picture: string;
};

export const useCard = ({ name }: Props): Props => {
  const getName = () => {
    if (name) {
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
      return name.length > 1 ? formattedName : "";
    }

    return "";
  };
  return { name: getName(), picture: "" };
};
