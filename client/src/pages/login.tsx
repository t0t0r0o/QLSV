import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { login }  from "../context/authContext/apiCalls"
import { AuthContext } from "../context/authContext/AuthContext";
import ButtonAppBar from "../components/navbar.tsx";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isFetching, dispatch,error } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);

  };


//   const login = async () => {
//     await axios
//       .post("http://localhost:8000/api/auth/login", { 'email': email, 'password': password })
//       .then((r) => {
//         localStorage.setItem("JWT", r.data.access_token);
//         JSON.parse(atob(r.data.access_token.split('.')[1])).role === "admin" ? navigate('/admin') : navigate('/qlht');
//       })
//       .catch((r) => console.log(r))
//   }


//   async function handleSubmit() {
//     await login();
//   }

console.log(error)
  const paperStyle = {
    padding: 20,
    height: "65vh",
    width: 300,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1976d2" };
  const btnstyle = { margin: "8px 0" };
  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Log In</h2>
            {error && error.status == 401 && <span style={{color:'red'}}>Wrong username or password</span>}
            {error && error.status == 403 && <span style={{color:'red'}}>Inactive account</span>}
            <p></p>
          </Grid>
          <TextField
            label="Email"
            placeholder="Enter email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p></p>
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={handleLogin}
            disabled={isFetching}
          >
            Sign in
          </Button>
          <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
          <Typography>
            {" "}
            Do not have an account ?<Link href="/register">Sign In</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
}

export default Login;
