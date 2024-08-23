import styled from "styled-components/native";
import { ThemedView } from "../global/components/ThemedView";
import { ThemedText } from "../global/components/ThemedText";

export const Wrapper = styled(ThemedView)`
  margin: 20px;
`;

export const LoadingWrapper = styled(ThemedView)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const PokemonName = styled(ThemedText)`
  font-weight: bold;
  font-size: 24px;
`;

export const PictureWrapper = styled(ThemedView)`
  justify-content: center;
  align-items: center;
`;

export const Picture = styled.Image.attrs({
  resizeMode: "contain",
})`
  width: 240px;
  height: 240px;
`;

export const HorizontalScroll = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
})``;

export const Title = styled(ThemedText)`
  font-weight: bold;
  font-size: 20px;
`;

export const Name = styled(ThemedText)`
  margin: 12px;
`;
