import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import neosActions from "../redux/neos/actions"
import {
  Box,
  Button,
  Checkbox,
  Modal,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material"
import { RootState } from "../redux/store"
import { Friend } from "../types/neos"

const FriendImportModal: React.FC = () => {
  const dispatch = useDispatch()
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    minWidth: "300px",
    textAlign: "center",
  }
  const { isShowingFriendImportModal, friends } = useSelector(
    (state: RootState) => state.neosReducer
  )

  return (
    <Modal
      open={isShowingFriendImportModal}
      onClose={() => {
        dispatch({ type: neosActions.IMPORT_MODAL_HIDE })
      }}
    >
      {friends && friends.length > 0 ? (
        <Box sx={style}>
          <Typography
            id="modal-title"
            variant="h6"
            sx={{ textAlign: "center" }}
          >
            確認
          </Typography>
          <TableContainer sx={{ minWidth: 300, maxHeight: 720 }}>
            <TableHead>
              <TableRow>
                <TableCell>Check</TableCell>
                <TableCell>UserName</TableCell>
                <TableCell>UserID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {friends.map((user: Friend) => {
                return (
                  <TableRow hover key={"FriendImportModal:" + user.id}>
                    <TableCell key={"checkbox:" + user.id}>
                      <Checkbox
                        defaultChecked
                        onChange={(e) => (user.checked = e.target.checked)}
                      />
                    </TableCell>
                    <TableCell key={"username:" + user.id}>
                      {user.friendUsername}
                    </TableCell>
                    <TableCell key={"id:" + user.id}>{user.id}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </TableContainer>
          <Box sx={{ padding: "4px" }}>
            <Button
              variant="contained"
              sx={{ margin: "4px 4px" }}
              onClick={() => {
                friends.forEach((user: Friend) => {
                  if (user.checked === undefined || user.checked === true)
                    dispatch(neosActions.searchUserByIdActionCreator(user.id))
                })
                dispatch({ type: neosActions.IMPORT_MODAL_HIDE })
              }}
            >
              チェックしたものを全てインポート
            </Button>
            <Button
              variant="contained"
              sx={{ margin: "4px 4px" }}
              onClick={() => {
                alert(
                  "この操作はAPIが正常な日時を返さないために期待される動作と異なることを予めご了承下さい."
                )
                friends.forEach((user: Friend) => {
                  if (
                    (user.checked === undefined || user.checked === true) &&
                    new Date().getTime() -
                      new Date(user.userStatus.lastStatusChange).getTime() <
                      86400 * 30
                  ) {
                    dispatch(neosActions.searchUserByIdActionCreator(user.id))
                  }
                })
                dispatch({ type: neosActions.IMPORT_MODAL_HIDE })
              }}
            >
              最近ログインしたフレンドのみインポート
            </Button>
          </Box>
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

export default FriendImportModal
