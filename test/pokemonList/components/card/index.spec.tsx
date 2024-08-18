import { fireEvent, render, screen } from "@testing-library/react-native";
import getPictureFake from "@/test/doubles/fakers/getPictureFake";
import getNameFake from "@/test/doubles/fakers/getNameFake";
import { Card } from "@/src/pokemonList/components/card";

describe("PokemonList: Card", () => {
  const picture = getPictureFake();

  test("should show pokemon name with success", () => {
    const name = getNameFake();
    render(
      <Card
        name={name}
        picture={picture}
        onPress={function (name: string): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );

    expect(screen.getByText(name)).toBeTruthy();
  });

  test.each(["", undefined, null])("should not show pokemon name", (name) => {
    render(
      <Card
        name={name!}
        picture={picture}
        onPress={function (name: string): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );

    expect(screen.queryByTestId("name_id")).not.toBeTruthy();
  });

  test("should show pokemon picture with success", () => {
    render(
      <Card
        name=""
        picture={picture}
        onPress={function (name: string): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );

    expect(screen.getByTestId("picture_id").props.source.uri).toEqual(picture);
  });

  test.each([null, undefined, ""])(
    "should show pokemon picture and name if picture is not defined",
    (picture) => {
      render(
        <Card
          name=""
          picture={picture!}
          onPress={function (name: string): void {
            throw new Error("Function not implemented.");
          }}
        />,
      );

      expect(screen.queryByTestId("picture_id")).not.toBeTruthy();
      expect(screen.queryByTestId("name_id")).not.toBeTruthy();
    },
  );

  test("should call onPress function correctly", () => {
    const name = getNameFake();
    const onPress = jest.fn();
    render(<Card name={name} picture={picture!} onPress={onPress} />);

    fireEvent.press(screen.getByTestId("card_button_id"));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith(name);
  });
});
