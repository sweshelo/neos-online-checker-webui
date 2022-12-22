import { User } from "../../types/neos"

const neosActions = {
  ADD_USER: "ADD_USER",
  DELETE_USER: "DELETE_USER",
  SEARCH_USER: "SEARCH_USER",
  SEARCH_USER_BY_ID: "SEARCH_USER_BY_ID",
  REGISTER_SEARCH_RESULT: "REGISTER_SEARCH_RESULT",

  GET_STATUS: "GET_STATUS",
  SET_STATUS: "SET_STATUS",

  MODAL_SHOW: "MODAL_SHOW",
  MODAL_HIDE: "MODAL_HIDE",

  WRITE_TO_COOKIE: "WRITE_TO_COOKIE",
  READ_FROM_COOKIE: "READ_FROM_COOKIE",

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

  getUserStateActionCreator: (id: string) => ({
    type: "GET_STATUS",
    payload: {
      id,
    },
  }),
  searchUserByIdActionCreator: (userId: string) =>
    ({
      type: "SEARCH_USER_BY_ID",
      payload: {
        userId,
      },
    } as const),
}

export default neosActions
