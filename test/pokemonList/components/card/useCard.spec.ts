import useCard from "@/src/pokemonList/components/card/useCard";
import getPictureFake from "@/test/doubles/fakers/getPictureFake";
import { renderHook } from "@testing-library/react-native";

describe("PokemonList: useCard", () => {
  test("should get the name with correct pattern", () => {
    const name = "bulbasaur";
    const { result } = makeSut({ name });

    expect(result.current.name).toEqual("Bulbasaur");
  });

  test.each(["", null, undefined])("should get the empty name", (name) => {
    const { result } = makeSut({ name: name! });

    expect(result.current.name).toEqual("");
  });

  test("should get the picture with success", () => {
    const picture = getPictureFake();
    const { result } = makeSut({ picture: picture });

    expect(result.current.picture).toEqual(picture);
  });

  test.each([null, undefined])("should get the empty picture", (picture) => {
    const { result } = makeSut({ picture: picture! });

    expect(result.current.picture).toEqual("");
  });

  test("should call onPress function received by props", () => {
    const onPress = () => {};
    const { result } = makeSut({ onPress });

    expect(result.current.onPress).toEqual(onPress);
  });
});

type SutProps = {
  name?: string;
  picture?: string;
  onPress?: (name: string) => void;
};

const makeSut = ({ name = "", picture = "", onPress = () => {} }: SutProps) => {
  return renderHook(() => useCard({ name, picture: picture!, onPress }));
};
