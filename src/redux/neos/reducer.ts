import { User, UserInfoAndUserStatus, UserStatus } from "../../types/neos"
import neosActions from "./actions"

type Action = {
  type: string;
  payload: {
    id: string;
    user: User;
    status: UserStatus;
  };
};

export type State = {
  isShowingModal: boolean;
  users: Array<UserInfoAndUserStatus>;
  searchResult: any;
};

const initialState: State = {
  isShowingModal: false,
  users: [],
  searchResult: null,
}

const neosReducer = (state = initialState, action: Action) => {
  switch (action.type) {
  case neosActions.ADD_USER:
    return {
      ...state,
      users: [
        ...state.users,
        {
          userInfo: action.payload.user,
          status: null,
        },
      ],
    }
  case neosActions.REGISTER_SEARCH_RESULT:
    return {
      ...state,
      searchResult: action.payload,
    }
  case neosActions.SET_STATUS:
    return {
      ...state,
      users: [...state.users].map((u) => {
        if (u.userInfo.id === action.payload.id) {
          return {
            userInfo: u.userInfo,
            status: action.payload.status,
          }
        } else {
          return u
        }
      }),
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
