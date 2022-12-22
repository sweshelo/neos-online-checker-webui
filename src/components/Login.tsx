import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import neosActions from "../redux/neos/actions"
import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { RootState } from "../redux/store"

const LoginModal: React.FC = () => {
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
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { isShowingLoginModal } = useSelector(
    (state: RootState) => state.neosReducer
  )

  return (
    <Modal
      open={isShowingLoginModal}
      onClose={() => {
        dispatch({ type: neosActions.LOGIN_MODAL_HIDE })
      }}
    >
      <Box sx={style}>
        <Typography
          sx={{
            margin: "4px",
          }}
        >
          Loginしてフレンド一覧を取り込みます
        </Typography>
        <TextField
          label="Username"
          type={"userid"}
          defaultValue=""
          sx={{
            margin: "4px",
          }}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
        <br />
        <TextField
          label="Password"
          type={"password"}
          defaultValue=""
          sx={{
            margin: "4px",
          }}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <br />
        <Button
          variant="contained"
          sx={{
            width: "200px",
            margin: "4px",
          }}
          onClick={() => {
            dispatch(neosActions.loginNeosActionCreator(username, password))
          }}
        >
          login
        </Button>
      </Box>
    </Modal>
  )
}

export default LoginModal
