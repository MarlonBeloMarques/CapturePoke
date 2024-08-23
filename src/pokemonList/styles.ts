import styled from "styled-components/native";
import { ThemedView } from "../global/components/ThemedView";

export const Wrapper = styled(ThemedView)`
  flex: 1;
  justify-content: center;
`;

export const Pokemons = styled.FlatList.attrs({
  numColumns: 2,
  contentContainerStyle: {
    alignItems: "center",
    flexGrow: 1,
  },
  onEndReachedThreshold: 0.9,
})``;

export const CardWrapper = styled(ThemedView)`
  width: 140px;
  height: 140px;
  margin: 10px;
`;

export const ErrorMessageWrapper = styled(ThemedView)`
  align-items: center;
`;
