import React, { useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type LoginData = {
  username: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      // Make the API request
      const response = await axios.post(
        "http://127.0.0.1:3000/login",
        loginData
      );

      // Handle the response
      console.log("Login successful");
      console.log("Response:", response.data);

      // Reset the form
      setLoginData({ username: "", password: "" });
    } catch (error) {
      console.error("Login failed");
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ width: 300 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Login
          </Typography>
          <form>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" sx={{ width: "75%" }}>
              Log In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
