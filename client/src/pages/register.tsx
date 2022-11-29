import React, { useState } from "react";
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Register() {
  const navigate = useNavigate();


  // set value
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [gender, setGender] = useState('None');

  const handleChange = (e) => {
    setGender(e.target.value as string);
  };


  const newUser = {username:username,firstname:firstname,lastname:lastname,email:email,phoneNumber:number,gender:gender,password:password};
    const Register = async () => {
        if(password != confirmPassword) {
          alert("Mat khau nhap sai");
        }
        await axios
            .post("http://localhost:8000/api/auth/register",newUser)
            .then(() => {alert("Dang ky thanh cong"); navigate('/login')})
            .catch((r) => alert(r.response.data.slice(r.response.data.indexOf('["')+2,r.response.data.indexOf('"]'))))
    }


    async function handleSubmit() {
        await Register();
    }







  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 600,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1976d2" };
  const btnstyle = { margin: "8px 0" };
  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center" >
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Email"
                placeholder="abc@gmail.com"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Username"
                placeholder="Enter username"
                variant="outlined"
                fullWidth
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Confirm Password"
                placeholder="Enter password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                placeholder="Enter First Name"
                type="text"
                variant="outlined"
                fullWidth
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                placeholder="Enter Last Name"
                type="text"
                variant="outlined"
                fullWidth
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Number"
                placeholder="Enter Number"
                type="text"
                variant="outlined"
                fullWidth
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="Gender"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value={'None'}>None</MenuItem>
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                  <MenuItem value={'Undefined'}>Undefined</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <p></p>
          <p></p>
          <p></p>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={()=>handleSubmit()}
          >
            Sign up
          </Button>
          <Typography>
            {" "}
            Do you have an account ?<Link href="/login">Log in</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
}

export default Register;
