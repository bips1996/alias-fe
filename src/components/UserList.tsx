// src/components/UserList.tsx
import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

interface User {
  id: number;
  name: string;
}

interface UserListProps {
  users: User[];
  selectedUser: User;
  onSelectUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, selectedUser, onSelectUser }) => {
  return (
    <Paper sx={{ width: "30%", mr: 2, p: 2, overflowY: "auto" }} elevation={3}>
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      <List>
        {users.map((user) => (
          <React.Fragment key={user.id}>
            <ListItem
              button
              selected={selectedUser.id === user.id}
              onClick={() => onSelectUser(user)}
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
  );
};

export default UserList;
