export type Props = {
  name: string;
  picture: string;
  onPress: (name: string) => void;
};

export const useCard = ({ name, picture, onPress }: Props): Props => {
  const getName = () => {
    if (name) {
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
      return name.length > 1 ? formattedName : "";
    }

    return "";
  };
  return { name: getName(), picture: picture ?? "", onPress };
};

export default useCard;
