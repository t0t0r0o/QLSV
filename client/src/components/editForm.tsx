import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

import { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function FormDialog(props) {
    const pageType = props.pageType;
    const getData = props.getData;
    const page = props.page;
    const rowsPerPage = props.rowsPerPage;
    const column = props.column;
    const keyword = props.keyword;
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    // set value
    const [user,setUser] = useState(props.user);
    useEffect(() => {
        setUser(props.user);
        
    },[])
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const [gender, setGender] = useState("");
    const [role,setRole] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        setId(props.user.id);
        setUsername(props.user.username);
        setFirstname(props.user.firstname);
        setLastname(props.user.lastname);
        setEmail(props.user.email);
        setNumber(props.user.number);
        setGender(props.user.gender);
        setRole(props.user.role);
    },[props.user])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    let userEdit = {};

    if(pageType == 'students') {
        userEdit = {username:username,firstname:firstname,lastname:lastname,email:email,phoneNumber:number,gender:gender};
    } else {
        userEdit = {username:username,firstname:firstname,lastname:lastname,email:email,phoneNumber:number,gender:gender,role:role};
    }


    const editUser = async (id) => {
        const headers = {'Authorization' : "Bearer " + JSON.parse(localStorage.getItem('user')).access_token}
        await axios
            .put("http://localhost:8000/api/"+pageType+"/" + id,userEdit,{headers})
            .then(() => {alert("Update thanh cong"); getData(page, rowsPerPage, column, keyword)})
            .catch((r) => {alert(r.response.data.message)})
    }


    async function handleEdit() {
        await editUser(id);
        setOpen(false);
    }


    return (
        <IconButton>
            <IconButton onClick={handleClickOpen}>
                <EditIcon/>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Information</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="username"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={username}
                        disabled
                        inputProps={{ pattern: "[a-zA-Z0-9]{6,20}" }}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        placeholder={user.firstname}
                        value={firstname}
                        inputProps={{ pattern: "[a-zA-Z0-9 ]{6,20}" }}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        placeholder={user.lastname}
                        inputProps={{ pattern: "[a-zA-Z0-9 ]{6,20}" }}
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        inputProps={{ pattern: "[a-zA-Z0-9@.]{20,40}" }}
                        fullWidth
                        variant="standard"
                        placeholder={user.email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Number"
                        type="text"
                        fullWidth
                        inputProps={{ pattern: "[0-9]*" }}
                        variant="standard"
                        placeholder={user.number}
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Gender"
                        type="text"
                        fullWidth
                        variant="standard"
                        placeholder={user.gender}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    {pageType == 'users' && <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel id="demo-customized-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value={"qlht"}>QLHT</MenuItem>
                        <MenuItem value={"admin"}>Admin</MenuItem>
                    </Select>
                </FormControl>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {handleEdit()}}>Update</Button>
                </DialogActions>
            </Dialog>
        </IconButton>
    );
}