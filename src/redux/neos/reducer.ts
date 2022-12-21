import { User } from "../../types/neos"
import neosActions from "./actions"

type Action = {
  type: string;
  payload: any;
};

type State = {
  isShowingModal: boolean;
  users: {
    [key: string]: User | undefined;
  } | null;
  searchResult: any;
};

const initialState: State = {
  isShowingModal: false,
  users: null,
  searchResult: null,
}

const neosReducer = (state = initialState, action: Action) => {
  switch (action.type) {
  case neosActions.ADD_USER:
    return {
      ...state,
      users: {
        ...state.users,
        [action.payload.id]: {},
      },
    }
  case neosActions.REGISTER_SEARCH_RESULT:
    return {
      ...state,
      searchResult: action.payload,
    }
  case neosActions.SET_STATUS:
    return {
      ...state,
      users: {
        ...state.users,
        [action.payload.user.id]: action.payload.user,
      },
    }
  case neosActions.MODAL_SHOW:
    return {
      ...state,
      isShowingModal: true,
    }
  case neosActions.MODAL_HIDE:
    return {
      ...state,
      isShowingModal: false,
    }
  default:
    return state
  }
}

export default neosReducer
