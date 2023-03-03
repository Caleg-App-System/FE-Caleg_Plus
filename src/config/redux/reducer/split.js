const initialState = {
  split: "one",
};

const split = (state = initialState, action) => {
  switch (action.type) {
    case "SPLIT_ONE":
      return ({
        ...state,
        split: "one",
      });
    case "SPLIT_TWO":
      return ({
        ...state,
        split: "two",
      });
    case "SPLIT_FOUR":
      return ({
        ...state,
        split: "four",
      });
    default:
      return state;
  }
}

export default split;