import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NavigationBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Incog
        </Typography>
        <Button color="inherit" component={RouterLink} to="/profile">
          My Profile
        </Button>
        <Button color="inherit" component={RouterLink} to="/groups">
          Groups
        </Button>
        <Button color="inherit" component={RouterLink} to="/chat">
          Chats
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;