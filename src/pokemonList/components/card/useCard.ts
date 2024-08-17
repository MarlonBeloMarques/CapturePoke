export type Props = {
  name: string;
  picture: string;
};

export const useCard = ({ name, picture }: Props): Props => {
  const getName = () => {
    if (name) {
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
      return name.length > 1 ? formattedName : "";
    }

    return "";
  };
  return { name: getName(), picture: picture ?? "" };
};

export default useCard;
