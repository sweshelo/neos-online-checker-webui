import {
  Credentials,
  Friend,
  User,
  UserInfoAndUserStatus,
  UserStatus,
} from "../../types/neos"
import neosActions from "./actions"

type Action = {
  type: string;
  payload: {
    id: string;
    user: User;
    status: UserStatus;
    credentials: Credentials;
    friends: Array<Friend>;
  };
};

export type State = {
  isShowingModal: boolean;
  isShowingLoginModal: boolean;
  isShowingFriendImportModal: boolean;
  users: Array<UserInfoAndUserStatus>;
  searchResult: any;
  you: Credentials | undefined | null;
  friends: Array<Friend>;
};

const initialState: State = {
  isShowingModal: false,
  isShowingLoginModal: false,
  isShowingFriendImportModal: false,
  users: [],
  searchResult: null,
  you: null,
  friends: [],
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
  case neosActions.LOGIN_MODAL_SHOW:
    return {
      ...state,
      isShowingLoginModal: true,
    }
  case neosActions.LOGIN_MODAL_HIDE:
    return {
      ...state,
      isShowingLoginModal: false,
    }
  case neosActions.IMPORT_MODAL_SHOW:
    return {
      ...state,
      isShowingFriendImportModal: true,
    }
  case neosActions.IMPORT_MODAL_HIDE:
    return {
      ...state,
      isShowingFriendImportModal: false,
    }

  case neosActions.SAVE_CREDENTIALS:
    return {
      ...state,
      you: action.payload.credentials,
    }
  case neosActions.SET_FRIENDS:
    return {
      ...state,
      friends: action.payload.friends,
    }
  default:
    return state
  }
}

export default neosReducer
