import React, { useState } from "react"
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
                  <TableRow hover key={user.id}>
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
          <Button
            variant="contained"
            onClick={() => {
              friends.forEach((user: Friend) => {
                if (user.checked === undefined || user.checked === true)
                  dispatch(neosActions.searchUserByIdActionCreator(user.id))
              })
              dispatch({
                type: neosActions.IMPORT_MODAL_HIDE,
              })
            }}
          >
            Import
          </Button>
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
