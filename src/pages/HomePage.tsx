// src/pages/HomePage.tsx
import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Welcome to Incog
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/chat")}>
        Go to Chat
      </Button>
    </Container>
  );
};

export default HomePage;
