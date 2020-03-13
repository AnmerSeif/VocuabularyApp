export const getBGColor = (difficulity: string) => {
  switch (difficulity) {
    case "hard":
      return "#E74C3C";
    case "medium":
      return "#E67E22";
    case "easy":
      return "#49BC7A";
    default:
      return "#1abc9c";
  }
};

export const getCardColor = (difficulity: string) => {
  switch (difficulity) {
    case "hard":
      return "#E27368";
    case "medium":
      return "#E6A367";
    case "easy":
      return "#80CBA0";
    default:
      return "#1abc9c";
  }
};
