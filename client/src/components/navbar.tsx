import * as React from 'react';
import axios from 'axios';
import $ from 'jquery';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Button } from '@mui/material';

import { AuthContext } from "../context/authContext/AuthContext";
import { logout } from "../context/authContext/AuthActions";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ButtonAppBar({ role }) {

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutFunction = async () => {
        axios.defaults.headers.common['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem('user')).access_token;
        await axios.post('http://localhost:8000/api/auth/logout',
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem('user')).access_token,
                },
            }).then((r) => {
                console.log(r);
                alert("logout")
            }).catch((error) => {
                console.log(error)
            })
    }

    const username = JSON.parse(atob(JSON.parse(localStorage.getItem('user')).access_token.split('.')[1])).username;


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" >
                        <Link href="/" color="inherit" underline='none'>
                            Home
                        </Link>
                        <Link href="/qlht" color="inherit" underline='none' p={3}>
                            Student
                        </Link>
                        <Link href="/admin" color="inherit" underline='none' >
                            User
                        </Link>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    
                    </Typography>
                    <Typography>{username}</Typography>
                    <Button color="inherit"  onClick={() => {logoutFunction();dispatch(logout());navigate("/")}}>LogOUT</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
