import { ThemedText } from "@/src/global/components/ThemedText";
import { ThemedView } from "@/src/global/components/ThemedView";
import { render, screen } from "@testing-library/react-native";
import { Image } from "react-native";
import getPictureFake from "@/test/doubles/fakers/getPictureFake";
import getNameFake from "@/test/doubles/fakers/getNameFake";

describe("PokemonList: Card", () => {
  const picture = getPictureFake();

  test("should show pokemon name with success", () => {
    const name = getNameFake();
    render(<Card name={name} picture={picture} />);

    expect(screen.getByText(name)).toBeTruthy();
  });

  test.each(["", undefined, null])("should not show pokemon name", (name) => {
    render(<Card name={name!} picture={picture} />);

    expect(screen.queryByTestId("name_id")).not.toBeTruthy();
  });

  test("should show pokemon picture with success", () => {
    render(<Card name="" picture={picture} />);

    expect(screen.getByTestId("picture_id").props.source.uri).toEqual(picture);
  });

  test.each([null, undefined, ""])(
    "should show pokemon picture and name if picture is not defined",
    (picture) => {
      render(<Card name="" picture={picture!} />);

      expect(screen.queryByTestId("picture_id")).not.toBeTruthy();
      expect(screen.queryByTestId("name_id")).not.toBeTruthy();
    },
  );
});

type Props = {
  name: string;
  picture: string;
};

const Card = ({ name, picture }: Props) => {
  return (
    <>
      {picture && (
        <ThemedView>
          <Image testID="picture_id" source={{ uri: picture }} />
          {name && <ThemedText testID="name_id">{name}</ThemedText>}
        </ThemedView>
      )}
    </>
  );
};
