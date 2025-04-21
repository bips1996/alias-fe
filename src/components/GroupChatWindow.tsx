import React from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { Message } from "../types/Message";
import { User } from "../types/User";

interface GroupChatWindowProps {
  groupName: string;
  users: User[];
  messages: Message[];
  input: string;
  onInputChange: (val: string) => void;
  onSend: () => void;
  incognitoMode: boolean;
  setIncognitoMode: (val: boolean) => void;
  onEditGroup?: () => void; // renamed for clarity
}

const renderStatusIcon = (status: string) => {
  let icon;
  if (status === "seen") {
    icon = <DoneAllIcon fontSize="small" sx={{ color: "blue", ml: 0.5 }} />;
  } else if (status === "delivered") {
    icon = <DoneAllIcon fontSize="small" sx={{ color: "gray", ml: 0.5 }} />;
  } else if (status === "sent") {
    icon = <DoneIcon fontSize="small" sx={{ color: "gray", ml: 0.5 }} />;
  } else {
    return null;
  }

  return (
    <Tooltip title={status.charAt(0).toUpperCase() + status.slice(1)} arrow>
      {icon}
    </Tooltip>
  );
};

const GroupChatWindow: React.FC<GroupChatWindowProps> = ({
  groupName,
  users,
  messages,
  input,
  onInputChange,
  onSend,
  incognitoMode,
  setIncognitoMode,
  onEditGroup
}) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2
        }}
      >
        <Typography variant="h6">{groupName}</Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={incognitoMode}
                onChange={(e) => setIncognitoMode(e.target.checked)}
                color="primary"
              />
            }
            label="Incognito"
          />
          <Tooltip title="Edit Group Details">
            <IconButton onClick={onEditGroup}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
        {messages.map((msg, idx) => {
          const isSelf = msg.from === 1; // Replace 1 with logged-in user ID
          const sender = users.find((u) => u.id === msg.from);
          return (
            <Box
              key={idx}
              sx={{
                textAlign: isSelf ? "right" : "left",
                mb: 1
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: incognitoMode ? "lightgray" : "gray",
                  display: "block",
                  mb: 0.5
                }}
              >
                {sender?.name}
              </Typography>

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: isSelf ? "flex-end" : "flex-start"
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    display: "inline-block",
                    p: 1,
                    bgcolor: isSelf ? "primary.main" : incognitoMode ? "#424242" : "grey.300",
                    color: isSelf || incognitoMode ? "white" : "black",
                    borderRadius: 2,
                    maxWidth: "60%",
                    whiteSpace: "pre-wrap"
                  }}
                >
                  {msg.text}
                </Typography>
                {isSelf && renderStatusIcon(msg.status)}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Input */}
      <Box sx={{ display: "flex" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          InputProps={{
            sx: {
              bgcolor: incognitoMode ? "#424242" : "white",
              color: incognitoMode ? "white" : "black"
            }
          }}
        />
        <IconButton color="primary" onClick={onSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default GroupChatWindow;
