import React, { useState, useEffect } from "react"
import {
  User,
  UserInfoAndUserStatus,
  Session,
  SessionUser,
} from "../types/neos"
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

type SessionDetailModalProps = {
  open: boolean;
  session: {
    sessionId: string;
    userId: string;
    sessionInfo?: Session;
  };
  users: UserInfoAndUserStatus[];
};

const SessionDetailModal: React.FC<SessionDetailModalProps> = ({
  open,
  session,
  users,
}) => {
  const dispatch = useDispatch()
  const [sessionInfo, setSessionInfo] = useState<Session | null>(null)
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "600px",
    overflow: "scroll",
  }

  useEffect(() => {
    setSessionInfo(
      users
        .find((user) => user.userInfo.id == session.userId)
        ?.status?.activeSessions?.find(
          (storedSession) => storedSession.sessionId == session.sessionId
        ) as Session
    )
  }, [session])

  return (
    <Modal
      open={open}
      onClose={() => {
        dispatch({ type: neosActions.SESSION_MODAL_HIDE })
      }}
    >
      <Box sx={style}>
        <Typography textAlign={"center"}>Session Details</Typography>
        <Typography>{sessionInfo?.name}</Typography>
        <Typography fontSize={12} marginBottom={2}>
          {sessionInfo?.description}
        </Typography>
        <img
          src={sessionInfo?.thumbnail}
          style={{
            marginBottom: "10px",
            maxWidth: "400px",
            alignContent: "center",
          }}
        />
        <Typography>{`ホスト: ${sessionInfo?.hostUsername}`}</Typography>
        <Typography>{`アクセスレベル: ${sessionInfo?.accessLevel}`}</Typography>
        <Typography>
          {`ユーザ数:  ${sessionInfo?.activeUsers} (${sessionInfo?.joinedUsers}) / ${sessionInfo?.maxUsers}`}
        </Typography>
        <Typography sx={{ marginTop: "10px" }}>{"ユーザ一覧"}</Typography>
        {sessionInfo?.sessionUsers.map((user: SessionUser) => {
          return (
            <Typography
              key={`SessionDetailModal-${user.userID}`}
              sx={{
                color: user.isPresent
                  ? user.userID === sessionInfo.hostUserId
                    ? "gold"
                    : "#000"
                  : "#aaa",
              }}
            >
              {user.username}
            </Typography>
          )
        })}
      </Box>
    </Modal>
  )
}

export default SessionDetailModal
