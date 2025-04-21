//src/pages/ProfilePage.tsx
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Typography,
  IconButton,
  Paper,
  TextField,
  Button,
  Input
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const MyProfilePage: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    about: "Software Engineer at ChatApp Inc.",
    profilePic: "https://i.pravatar.cc/150?img=3"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setEditMode(false);
    // Logic to persist changes (API call) goes here
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, position: "relative" }}>
        {!editMode && (
          <IconButton
            sx={{ position: "absolute", top: 16, right: 16 }}
            onClick={() => setEditMode(true)}
          >
            <EditIcon />
          </IconButton>
        )}

        <Box display="flex" flexDirection="column" alignItems="center">
          <Box sx={{ position: "relative" }}>
            <Avatar
              alt={user.name}
              src={user.profilePic}
              sx={{
                width: 100,
                height: 100,
                mb: 2
              }}
            />
            {editMode && (
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: "50%",
                  padding: "8px",
                  cursor: "pointer"
                }}
              >
                <PhotoCameraIcon fontSize="large" sx={{ color: "white" }} />
                <Input type="file" hidden onChange={handleProfilePicChange} />
              </IconButton>
            )}
          </Box>

          {editMode ? (
            <>
              <TextField
                name="name"
                label="Name"
                value={user.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="email"
                label="Email"
                value={user.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="phone"
                label="Phone"
                value={user.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="about"
                label="About"
                value={user.about}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                sx={{ mt: 2, alignSelf: "flex-end" }}
                onClick={handleSave}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h5" gutterBottom>
                {user.name}
              </Typography>
              <Typography color="textSecondary">{user.email}</Typography>
              <Typography color="textSecondary">{user.phone}</Typography>
              <Typography sx={{ mt: 2 }} textAlign="center">
                {user.about}
              </Typography>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default MyProfilePage;
