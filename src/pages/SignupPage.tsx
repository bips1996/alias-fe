import React, { useState } from "react";
import { Box, Button, Link, TextField, Typography, CircularProgress } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (phone.trim().length === 10) {
      setSendingOtp(true);
      // Simulate async OTP send
      setTimeout(() => {
        console.log("OTP sent to", phone);
        setOtpSent(true);
        setSendingOtp(false);
      }, 1500);
    } else {
      alert("Please enter a valid 10-digit phone number");
    }
  };

  const handleSignup = () => {
    if (!otpSent) {
      alert("Please send OTP first");
      return;
    }

    if (!name || !phone || !otp) {
      alert("Please fill all the fields");
      return;
    }

    // Simulate user signup
    console.log("User signed up:", { name, phone });
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" mb={2}>
        Sign Up
      </Typography>

      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        sx={{ maxWidth: 400, mb: 2 }}
      />

      <TextField
        label="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        fullWidth
        sx={{ maxWidth: 400, mb: 1 }}
      />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ maxWidth: 400, width: "100%", mb: 2 }}
      >
        <Button
          variant="outlined"
          onClick={handleSendOtp}
          disabled={sendingOtp}
          sx={{ flex: 1, mr: 2 }}
        >
          Send OTP
        </Button>

        {sendingOtp ? (
          <CircularProgress size={24} />
        ) : (
          otpSent && (
            <Typography variant="body2" color="green">
              OTP Sent
            </Typography>
          )
        )}
      </Box>

      <TextField
        label="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        fullWidth
        sx={{ maxWidth: 400, mb: 2 }}
      />

      <Button variant="contained" onClick={handleSignup}>
        Sign Up
      </Button>

      <Typography variant="body2" mt={2}>
        Already have an account?{" "}
        <Link component={RouterLink} to="/login">
          Signin
        </Link>
      </Typography>
    </Box>
  );
};

export default SignupPage;
