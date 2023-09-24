import { Session } from "inspector"
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
    userId: string;
    sessionId: string;
    sessionObj: Session;
  };
};

export type State = {
  isShowingModal: boolean;
  isShowingLoginModal: boolean;
  isShowingFriendImportModal: boolean;
  isShowingSessionModal: boolean;
  users: Array<UserInfoAndUserStatus>;
  searchResult: any;
  you: Credentials | undefined | null;
  friends: Array<Friend>;
  session: {
    sessionId: string;
    userId: string;
    sessionInfo?: Session;
  };
};

const initialState: State = {
  isShowingModal: false,
  isShowingLoginModal: false,
  isShowingFriendImportModal: false,
  isShowingSessionModal: false,
  users: [],
  searchResult: null,
  you: null,
  friends: [],
  session: {
    sessionId: "",
    userId: "",
  },
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
  case neosActions.DELETE_USER:
    return {
      ...state,
      users: [
        ...state.users.filter(
          (user) => user.userInfo.id !== action.payload.userId
        ),
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
  case neosActions.SESSION_MODAL_SHOW:
    return {
      ...state,
      session: {
        ...state.session,
        userId: action.payload.userId,
        sessionId: action.payload.sessionId,
      },
      isShowingSessionModal: true,
    }
  case neosActions.SESSION_MODAL_HIDE:
    return {
      ...state,
      isShowingSessionModal: false,
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
