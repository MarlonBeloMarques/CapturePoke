import useCard, { Props } from "./useCard";
import { Button, Name, Picture, Wrapper } from "./styles";

export const Card = ({ name, picture, onPress }: Props) => {
  return (
    <>
      {picture && (
        <Button testID="card_button_id" onPress={() => onPress(name)}>
          <Wrapper>
            <Picture testID="picture_id" source={{ uri: picture }} />
            {name && <Name testID="name_id">{name}</Name>}
          </Wrapper>
        </Button>
      )}
    </>
  );
};

const CardFactory = (props: Props) => {
  return <Card {...useCard(props)} />;
};

export default CardFactory;
