// src/pages/ChatPage.tsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  TextField,
  IconButton,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";

const dummyUsers = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Diana" },
];

const ChatPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState(dummyUsers[0]);
  const [messages, setMessages] = useState([
    { from: "Alice", text: "Hey!", status: "seen" },
    { from: "Me", text: "Hi Alice, what's up?", status: "delivered" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "Me", text: input, status: "sent" }]);
    setInput("");
  };

  const renderStatusIcon = (status: string) => {
    if (status === "seen") {
      return <DoneAllIcon fontSize="small" sx={{ color: "blue", ml: 0.5 }} />;
    } else if (status === "delivered") {
      return <DoneAllIcon fontSize="small" sx={{ color: "gray", ml: 0.5 }} />;
    } else if (status === "sent") {
      return <DoneIcon fontSize="small" sx={{ color: "gray", ml: 0.5 }} />;
    } else {
      return null;
    }
  };

  return (
    <Container sx={{ display: "flex", height: "85vh", mt: 2 }}>
      {/* Sidebar - User List */}
      <Paper elevation={3} sx={{ width: "25%", p: 2, mr: 2, overflowY: "auto" }}>
        <Typography variant="h6" gutterBottom>Users</Typography>
        <List>
          {dummyUsers.map((user) => (
            <React.Fragment key={user.id}>
              <ListItem
                button
                selected={selectedUser.id === user.id}
                onClick={() => setSelectedUser(user)}
              >
                <ListItemAvatar>
                  <Avatar>{user.name.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Chat Window */}
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
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <IconButton color="primary" onClick={handleSend}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatPage;
