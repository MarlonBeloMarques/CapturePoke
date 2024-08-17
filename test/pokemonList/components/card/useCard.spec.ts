import useCard from "@/src/pokemonList/components/card/useCard";
import getPictureFake from "@/test/doubles/fakers/getPictureFake";
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

  test("should get the picture with success", () => {
    const picture = getPictureFake();
    const { result } = renderHook(() => useCard({ name: "", picture }));

    expect(result.current.picture).toEqual(picture);
  });

  test("should get the picture with success", () => {
    const picture = getPictureFake();
    const { result } = renderHook(() => useCard({ name: "", picture }));

    expect(result.current.picture).toEqual(picture);
  });

  test.each([null, undefined])("should get the empty picture", (picture) => {
    const { result } = renderHook(() =>
      useCard({ name: "", picture: picture! }),
    );

    expect(result.current.picture).toEqual("");
  });
});
