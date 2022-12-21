const neosActions = {
  ADD_USER: "ADD_USER",
  DELETE_USER: "DELETE_USER",
  SEARCH_USER: "SEARCH_USER",
  REGISTER_SEARCH_RESULT: "REGISTER_SEARCH_RESULT",

  GET_STATUS: "GET_STATUS",
  SET_STATUS: "SET_STATUS",

  MODAL_SHOW: "MODAL_SHOW",
  MODAL_HIDE: "MODAL_HIDE",

  searchUserActionCreator: (username: string) =>
    ({
      type: "SEARCH_USER",
      payload: {
        username,
      },
    } as const),

  addUserActionCreator: (id: string) =>
    ({
      type: "ADD_USER",
      payload: {
        id,
      },
    } as const),

  getUserStateActionCreator: (id: string) => ({
    type: "GET_STATUS",
    payload: {
      id,
    },
  }),
}

export default neosActions
