// src/components/ChatWindow.tsx
import React from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";

interface Message {
  from: string;
  text: string;
  status: string;
}

interface User {
  id: number;
  name: string;
}

interface ChatWindowProps {
  selectedUser: User;
  messages: Message[];
  input: string;
  onInputChange: (val: string) => void;
  onSend: () => void;
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

const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedUser,
  messages,
  input,
  onInputChange,
  onSend,
}) => {
  return (
    <Paper sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column" }} elevation={3}>
      <Typography variant="h6" gutterBottom>
        Chat with {selectedUser.name}
      </Typography>

      <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            sx={{
              textAlign: msg.from === "Me" ? "right" : "left",
              mb: 1,
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  display: "inline-block",
                  p: 1,
                  bgcolor: msg.from === "Me" ? "primary.main" : "grey.300",
                  color: msg.from === "Me" ? "white" : "black",
                  borderRadius: 2,
                  maxWidth: "60%",
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.text}
              </Typography>
              {msg.from === "Me" && renderStatusIcon(msg.status)}
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />
        <IconButton color="primary" onClick={onSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatWindow;
