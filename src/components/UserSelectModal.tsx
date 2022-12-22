import React from "react"
//import "./UserSelectModal.css"
import { User } from "../types/neos"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import neosActions from "../redux/neos/actions"
import {
  Box,
  Button,
  Modal,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"

const UserSelectButton: React.FC<{ user: User }> = ({ user }) => {
  const dispatch = useDispatch()

  return (
    <Button id={"user-select-button"}>
      <h3>{user.username}</h3>
      <p>ID: {user.id}</p>
      <p>
        登録日: {new Date(user.registrationDate).toLocaleDateString("ja-JP")}
      </p>
    </Button>
  )
}

const UserSelectModal: React.FC = () => {
  const dispatch = useDispatch()
  const { isShowingModal, searchResult } = useSelector(
    (state: RootState) => state.neosReducer
  )
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }

  return (
    <Modal
      open={isShowingModal}
      onClose={() => {
        dispatch({ type: neosActions.MODAL_HIDE })
      }}
    >
      {searchResult && searchResult.length > 0 ? (
        <Box sx={style}>
          <Typography
            id="modal-title"
            variant="h6"
            sx={{ textAlign: "center" }}
          >
            ユーザを選択
          </Typography>
          <TableContainer sx={{ minWidth: 300, maxHeight: 720 }}>
            <TableHead>
              <TableRow>
                <TableCell>UserName</TableCell>
                <TableCell>UserID</TableCell>
                <TableCell>登録日</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResult.map((user: User) => {
                return (
                  <TableRow
                    hover
                    key={user.id}
                    onClick={() => {
                      dispatch(neosActions.addUserActionCreator(user))
                      dispatch(neosActions.getUserStateActionCreator(user.id))
                      dispatch({ type: neosActions.MODAL_HIDE })
                    }}
                  >
                    <TableCell key={"username:" + user.id}>
                      {user.username}
                    </TableCell>
                    <TableCell key={"id:" + user.id}>{user.id}</TableCell>
                    <TableCell key={"registrationDate:" + user.id}>
                      {new Date(user.registrationDate).toLocaleDateString(
                        "ja-JP"
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </TableContainer>
        </Box>
      ) : (
        <Box sx={style}>
          <Typography
            id="modal-title"
            variant="h6"
            sx={{ textAlign: "center" }}
          >
            見つかりませんでした
          </Typography>
        </Box>
      )}
    </Modal>
  )
}

export default UserSelectModal
