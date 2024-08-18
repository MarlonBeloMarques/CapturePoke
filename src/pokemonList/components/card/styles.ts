import { ThemedText } from "@/src/global/components/ThemedText";
import { ThemedView } from "@/src/global/components/ThemedView";
import styled from "styled-components/native";

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})``;

export const Wrapper = styled(ThemedView)`
  border-color: white;
  border-width: 2px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  padding: 6px;
`;

export const Picture = styled.Image.attrs({
  resizeMode: "contain",
})`
  width: 100%;
  height: 80%;
`;

export const Name = styled(ThemedText)`
  font-weight: bold;
`;
