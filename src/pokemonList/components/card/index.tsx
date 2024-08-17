import { Image } from "react-native";
import { ThemedText } from "@/src/global/components/ThemedText";
import { ThemedView } from "@/src/global/components/ThemedView";
import { Props } from "./useCard";

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

export default Card;
