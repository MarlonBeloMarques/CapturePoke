import useCard, { Props } from "./useCard";
import { Name, Picture, Wrapper } from "./styles";

export const Card = ({ name, picture }: Props) => {
  return (
    <>
      {picture && (
        <Wrapper>
          <Picture testID="picture_id" source={{ uri: picture }} />
          {name && <Name testID="name_id">{name}</Name>}
        </Wrapper>
      )}
    </>
  );
};

const CardFactory = (props: Props) => {
  return <Card {...useCard(props)} />;
};

export default CardFactory;
