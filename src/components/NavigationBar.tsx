import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavigationBar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Groups", path: "/groups" },
    { label: "Chats", path: "/chat" },
    { label: "My Profile", path: "/profile" }
  ];

  return (
    <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Incog
        </Typography>

        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              component={RouterLink}
              to={item.path}
              sx={{
                position: "relative",
                mx: 1,
                color: "white",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: isActive ? "100%" : "0%",
                  height: "2px",
                  bgcolor: "white"
                },
                "&:hover::after": {
                  width: "100%"
                }
              }}
            >
              {item.label}
            </Button>
          );
        })}

        <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
