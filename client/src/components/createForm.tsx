import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

import { useState } from 'react';
import { FormControl, Grid, Input, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { redirect, resolvePath, useNavigate } from 'react-router-dom';

export default function FormDialog(props) {
    const user = props.user;
    const setData = props.setData;
    const pageType = props.pageType;
    let page = props.page;
    let rowsPerPage = props.rowsPerPage;
    let column = props.column;
    let setColumn = props.setColumn;
    let keyword = props.keyword;
    let setKeyword = props.setKeyword;
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // set value
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [number, setNumber] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [school, setSchool] = useState("");


    //set search keyword
    //function search call api
    const search = async (column, keyword, id, record) => {
        const headers = { 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')).access_token }
        await axios
            .get(`http://localhost:8000/api/${pageType}?column=${column}&keyword=${keyword}&page=${id}&records=${record}`, { headers })
            .then((r) => { setData(r.data.data); })
            .catch((r) => { if (r.status == 401) { navigate('/login') } else { alert(r) } })
    }
    // event press enter to search
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            search(column, keyword, page, rowsPerPage);
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setGender(e.target.value as string);
    };

    let newUser = {}

    if (pageType === "students") {
        newUser = { username: username, firstname: firstname, lastname: lastname, email: email, phoneNumber: number, gender: gender, address: address, 'school-id': school }
    } else {
        newUser = { username: username, firstname: firstname, password: password, lastname: lastname, email: email, role: role, phoneNumber: number, gender: gender };
    }
    const createUser = async () => {
        const headers = { 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')).access_token };
        await axios
            .post(`http://localhost:8000/api/${pageType}/`, newUser, { headers })
            .then(() => { alert("Tao moi thanh coong") })
            .catch((r) => {if (r.response.status == 401) { navigate('/login') } else { alert("Created Error") }})
    }


    async function handleEdit() {
        await createUser();
        setOpen(false);
    }

    const paperStyle = {
        padding: 20,
        height: "40vh",
        width: 500,
        margin: "20px auto",
    };


    return (

        <Grid container spacing={2}>
            <Grid item xs={1}>
                <IconButton>
                    <IconButton onClick={handleClickOpen} color='info'>
                        <AddIcon /> Add
                    </IconButton>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Create Form</DialogTitle>
                        <Paper elevation={10} style={paperStyle}>
                            <Grid>

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
                                    {pageType == "users" && <Grid item xs={6}>
                                        <TextField
                                            label="Password"
                                            placeholder="Enter password"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Grid>}
                                    {pageType == "users" && <Grid item xs={6} >
                                        <Select
                                            sx={{ m: 1, minWidth: 120 }}
                                            labelId="demo-customized-select-label"
                                            id="demo-customized-select"
                                            // label="Age"
                                            value={role}
                                            defaultValue="qlht"
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <MenuItem value={"qlht"}> QLHT </MenuItem>
                                            <MenuItem value={"admin"}>Admin</MenuItem>
                                        </Select>
                                    </Grid>}
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
                                    {pageType === "students" && <>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="address"
                                                placeholder="Enter address"
                                                type="text"
                                                variant="outlined"
                                                fullWidth
                                                required
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="School"
                                                placeholder="Enter School"
                                                type="text"
                                                variant="outlined"
                                                fullWidth
                                                required
                                                value={school}
                                                onChange={(e) => setSchool(e.target.value)}
                                            />
                                        </Grid>
                                    </>}
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
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={() => { handleEdit() }}>Create</Button>
                                </DialogActions>
                            </Grid>
                        </Paper>
                    </Dialog>
                </IconButton>
            </Grid>
            <Grid item xs={8}>
            </Grid>
            <Grid item xs={3}>
                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel id="demo-customized-select-label">Column</InputLabel>
                    <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={column}
                        onChange={(e) => setColumn(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"id"}>ID</MenuItem>
                        <MenuItem value={"username"}>Username</MenuItem>
                        <MenuItem value={"firstname"}>Firstname</MenuItem>
                        <MenuItem value={"lastname"}>Lastname</MenuItem>
                        <MenuItem value={"gender"}>Gender</MenuItem>
                        <MenuItem value={"email"}>Email</MenuItem>
                        <MenuItem value={"phoneNumber"}>Number</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="demo-customized-textbox">Search</InputLabel>
                    <Input id="demo-customized-textbox" onKeyDown={handleKeyDown} value={keyword}
                        onChange={(e) => setKeyword(e.target.value)} />
                </FormControl>
            </Grid>
        </Grid>
    );
}