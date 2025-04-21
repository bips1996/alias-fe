import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Checkbox
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { Group } from "../types/Group";
import { User } from "../types/User";

// Dummy user list (replace with actual API data)
const allUsers: User[] = [
  { id: 1, name: "Alice", avatarUrl: "" },
  { id: 2, name: "Bob", avatarUrl: "" },
  { id: 3, name: "Charlie", avatarUrl: "" },
  { id: 4, name: "Diana", avatarUrl: "" }
];

interface Props {
  group: Group;
  onSave: (group: Group) => void;
  onClose: () => void;
}

const GroupDetails: React.FC<Props> = ({ group, onSave, onClose }) => {
  const [editedGroup, setEditedGroup] = useState<Group>({ ...group });
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>(group.members.map((m) => m.id));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedGroup((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveMember = (id: number) => {
    setEditedGroup((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== id)
    }));
    setSelectedUsers((prev) => prev.filter((uid) => uid !== id));
  };

  const handleToggleUser = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSaveUsers = () => {
    const newMembers = allUsers.filter((u) => selectedUsers.includes(u.id));
    setEditedGroup((prev) => ({
      ...prev,
      members: newMembers
    }));
    setAddDialogOpen(false);
  };

  return (
    <Box sx={{ p: 3, width: "100%", position: "relative" }}>
      <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={onClose}>
        <CloseIcon />
      </IconButton>

      <Typography variant="h6" gutterBottom>
        Edit Group Details
      </Typography>

      <TextField
        label="Group Name"
        name="name"
        value={editedGroup.name}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Description"
        name="description"
        value={editedGroup.description || ""}
        onChange={handleChange}
        multiline
        rows={2}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Members
      </Typography>
      <List dense>
        {editedGroup.members.map((member) => (
          <ListItem key={member.id}>
            <Avatar src={member.avatarUrl} sx={{ mr: 2 }} />
            <ListItemText primary={member.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleRemoveMember(member.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Tooltip title="Add Member">
          <IconButton
            color="primary"
            onClick={() => setAddDialogOpen(true)}
            sx={{ border: "1px solid", borderRadius: "50%" }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Save Changes">
          <IconButton
            color="success"
            onClick={() => onSave(editedGroup)}
            sx={{ border: "1px solid", borderRadius: "50%" }}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Add Member Dialog */}
      <Dialog open={isAddDialogOpen} onClose={() => setAddDialogOpen(false)} fullWidth>
        <DialogTitle>Select Members</DialogTitle>
        <DialogContent>
          <List dense>
            {allUsers.map((user) => (
              <ListItem key={user.id} button onClick={() => handleToggleUser(user.id)}>
                <Avatar src={user.avatarUrl} sx={{ mr: 2 }} />
                <ListItemText primary={user.name} />
                <Checkbox edge="end" checked={selectedUsers.includes(user.id)} tabIndex={-1} />
              </ListItem>
            ))}
          </List>

          <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
            <Tooltip title="Cancel">
              <IconButton
                onClick={() => setAddDialogOpen(false)}
                color="error"
                sx={{ border: "1px solid", borderRadius: "50%" }}
              >
                <CancelIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save Members">
              <IconButton
                onClick={handleSaveUsers}
                color="success"
                sx={{ border: "1px solid", borderRadius: "50%" }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default GroupDetails;
