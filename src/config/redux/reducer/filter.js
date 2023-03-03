const initialState = {
  show: "",
};

const filter = (state = initialState, action) => {
  switch (action.type) {
    case "PROVINCE":
      return ({
        ...state,
        show: "province",
      });
    case "REGENCY":
      return ({
        ...state,
        show: "regency",
      });
    case "DISTRICT":
      return ({
        ...state,
        show: "district",
      });
    case "VILLAGE":
      return ({
        ...state,
        show: "village",
      });
    default:
      return state;
  }
};

export default filter;