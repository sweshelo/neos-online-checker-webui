import actions from "./actions"

type Action = {
  type: string;
};

type State = {
  count: number;
};

const initialState: State = {
  count: 0,
}

const sampleReducer = (state = initialState, action: Action) => {
  switch (action.type) {
  case actions.INCREMENT:
    console.log("reducer", action, state)
    return { ...state, count: state.count + 1 }
  case actions.DECREMENT:
    return { ...state, count: state.count - 1 }
  default:
    return state
  }
}

export default sampleReducer
