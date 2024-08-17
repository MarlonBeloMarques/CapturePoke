import { Image } from "react-native";
import { ThemedText } from "@/src/global/components/ThemedText";
import { ThemedView } from "@/src/global/components/ThemedView";
import useCard, { Props } from "./useCard";

const Card = ({ name, picture }: Props) => {
  return (
    <>
      {picture && (
        <ThemedView
          style={{
            borderColor: "white",
            borderWidth: 2,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            padding: 6,
          }}
        >
          <Image
            testID="picture_id"
            source={{ uri: picture }}
            resizeMode="contain"
            style={{
              width: 100,
              height: 100,
            }}
          />
          {name && (
            <ThemedText testID="name_id" style={{ fontWeight: "bold" }}>
              {name}
            </ThemedText>
          )}
        </ThemedView>
      )}
    </>
  );
};

const CardFactory = (props: Props) => {
  return <Card {...useCard(props)} />;
};

export default CardFactory;
