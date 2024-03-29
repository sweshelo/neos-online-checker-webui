import { User } from "../../types/neos"

const neosActions = {
  ADD_USER: "ADD_USER",
  DELETE_USER: "DELETE_USER",
  SEARCH_USER: "SEARCH_USER",
  SEARCH_USER_BY_ID: "SEARCH_USER_BY_ID",
  REGISTER_SEARCH_RESULT: "REGISTER_SEARCH_RESULT",
  DELETE_USERS_WHO_DID_NOT_LOGIN_FOR_THREE_MONTHES:
    "DELETE_USERS_WHO_DID_NOT_LOGIN_FOR_THREE_MONTHES",

  GET_STATUS: "GET_STATUS",
  SET_STATUS: "SET_STATUS",

  MODAL_SHOW: "MODAL_SHOW",
  MODAL_HIDE: "MODAL_HIDE",
  LOGIN_MODAL_SHOW: "LOGIN_MODAL_SHOW",
  LOGIN_MODAL_HIDE: "LOGIN_MODAL_HIDE",
  IMPORT_MODAL_SHOW: "IMPORT_MODAL_SHOW",
  IMPORT_MODAL_HIDE: "IMPORT_MODAL_HIDE",
  SESSION_MODAL_SHOW: "SESSION_MODAL_SHOW",
  SESSION_MODAL_HIDE: "SESSION_MODAL_HIDE",

  SET_FOCUS_SESSION: "SET_FOCUS_SESSION",

  WRITE_TO_COOKIE: "WRITE_TO_COOKIE",
  READ_FROM_COOKIE: "READ_FROM_COOKIE",

  LOGIN_NEOS: "LOGIN_NEOS",
  SAVE_CREDENTIALS: "SAVE_CREDENTIALS",

  GET_FRIENDS: "GET_FRIENDS",
  SET_FRIENDS: "GET_FRIENDS",
  IMPORT_FROM_FRIENDLIST: "IMPORT_FROM_FRIENDLIST",

  searchUserActionCreator: (username: string) =>
    ({
      type: "SEARCH_USER",
      payload: {
        username,
      },
    } as const),

  addUserActionCreator: (user: User) =>
    ({
      type: "ADD_USER",
      payload: {
        user,
        id: user.id,
      },
    } as const),

  getUserStateActionCreator: () =>
    ({
      type: "GET_STATUS",
    } as const),

  searchUserByIdActionCreator: (userId: string) =>
    ({
      type: "SEARCH_USER_BY_ID",
      payload: {
        userId,
      },
    } as const),

  loginNeosActionCreator: (username: string, password: string) =>
    ({
      type: "LOGIN_NEOS",
      payload: {
        username,
        password,
      },
    } as const),
  sessionModalOpenActionCreator: (sessionId: string, relativeUserId: string) =>
    ({
      type: "SESSION_MODAL_SHOW",
      payload: {
        sessionId,
        userId: relativeUserId,
      },
    } as const),
  deleteUserByIdActionCreator: (userId: string) =>
    ({
      type: "DELETE_USER",
      payload: {
        userId,
      },
    } as const),
  deleteUsersWhoDidNotLoginForThreeMonths: () =>
    ({
      type: "DELETE_USERS_WHO_DID_NOT_LOGIN_FOR_THREE_MONTHES",
    } as const),
}

export default neosActions
