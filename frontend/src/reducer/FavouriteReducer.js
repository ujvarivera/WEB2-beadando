export const ACTIONS = {
  LIKE: "like",
  UNLIKE: "unlike",
  RESET: "reset"
};

export const initialState = [];

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.LIKE:
      if (!state.includes(payload)) {
        return [...state, payload];
      }
      return state;
    case ACTIONS.UNLIKE:
      return state.filter((e) => e !== payload);
    case ACTIONS.RESET:
      return initialState;
    default:
      throw new Error("Unknown type");
  }
};
