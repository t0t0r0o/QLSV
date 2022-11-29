import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import Paper from "@mui/material/Paper";
import TableUI from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Switch } from "@mui/material";

import FormDialog from "./editForm.tsx";

interface Column {
    id: 'id' | 'username' | 'firstname' | 'lastname' | 'email' | 'phoneNumber' | 'role' | 'gender' | 'active' | 'action';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

let columns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'username', label: 'username', minWidth: 100 },
    {
        id: 'firstname',
        label: 'firstname',
        minWidth: 140,
        align: 'right',
        // format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'lastname',
        label: 'lastname',
        minWidth: 140,
        align: 'right',
        // format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 140,
        align: 'right',
        // format: (value: number) => value.toFixed(2),
    },
    {
        id: 'phoneNumber',
        label: 'number',
        minWidth: 140,
        align: 'right',
        // format: (value: number) => value.toFixed(2),
    },
    {
        id: 'role',
        label: 'role',
        minWidth: 70,
        align: 'right',
        // format: (value: number) => value.toFixed(2),
    },
    {
        id: 'gender',
        label: 'Gender',
        minWidth: 80,
        align: 'right',
        // format: (value: number) => value.toFixed(2),
    },
    {
        id: 'active',
        label: 'Active',
        minWidth: 70,
        align: 'right'
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 150,
        align: 'right',
    },
];

interface Data {
    id: number,
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    number: string;
    gender: string;
    active: boolean;
}



function Table(props) {
    const data = props.data;
    const total = props.total;
    const getData = props.getData;
    const pageType = props.pageType;
    let page = props.page;
    let setPage = props.setPage;
    let rowsPerPage = props.rowsPerPage;
    let setRowsPerPage = props.setRowsPerPage;
    let columnData = props.column;
    let keyword = props.keyword;
    const [handleValuePage, setHandleValuePage] = useState(1);
    const [rows, setRows] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [enableRemove, setEnableRemove] = useState(false);
    const [enableBanned, setEnableBanned] = useState(false);
    const [checked, setChecked] = useState(false);

    const switchHandler = (data, id) => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + JSON.parse(localStorage.getItem('user')).access_token,
        };
        axios.put('http://localhost:8000/api/users/' + id, data, { headers }).then((r) => { console.log(r); getData(page, rowsPerPage, columnData, keyword); }).catch((er) => console.log(er))

    };


    const removeUser = async (id) => {
        const headers = { 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')).access_token }

        await axios
            .delete(`http://localhost:8000/api/${pageType}/` + id, { headers })
            .then(() => {
                alert("Da xoa thanh cong");
                getData(page, rowsPerPage, columnData, keyword);
            })
            .catch((r) => {
                setErrorMessage(r.message);
                alert(errorMessage)
            });
    }
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        getData(page, rowsPerPage, columnData, keyword).then(() => { setPage(value) });
    };

    useEffect(() => {
        getData(page, rowsPerPage, columnData, keyword);
    }, [page, rowsPerPage, columnData, keyword])

    useEffect(() => {
        setRows(data)
    }, [data])


    useEffect(() => {
        const permission = JSON.parse(atob(JSON.parse(localStorage.getItem('user')).access_token.split('.')[1])).permission;
        if (permission.includes('delete user')) {
            setEnableRemove(true);
        } else {
            setEnableRemove(false);
        }

        if (permission.includes('delete student')) {
            setEnableRemove(true);
        } else {
            setEnableRemove(false);
        }
        if (permission.includes('banned')) {
            setEnableBanned(true);
        } else {
            setEnableBanned(false);
        }
    })

    if (pageType == 'students') {
        columns = columns.filter((col) => {
            return col.id != 'active' && col.id != 'role'
        })
    }

    return (
        <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ maxHeight: 700 }}>
                <TableUI stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ top: 0, minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .map((row, index) => {
                                let user = { id: "", username: "", firstname: "", lastname: "", email: "", number: "", gender: "", role: "" }; // lay thong tin cua user duoc chon
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            const values = row[column.id];
                                            if (column.id == "id") {
                                                user.id = row[column.id];
                                            }
                                            if (column.id == "username") {
                                                user.username = row[column.id];

                                            }
                                            if (column.id == "firstname") {
                                                user.firstname = row[column.id];

                                            }
                                            if (column.id == "lastname") {
                                                user.lastname = row[column.id];

                                            }
                                            if (column.id == "email") {
                                                user.email = row[column.id];

                                            }
                                            if (column.id == "gender") {
                                                user.gender = row[column.id];

                                            }
                                            if (column.id == "phoneNumber") {
                                                user.number = row[column.id];

                                            }

                                            if (column.id == "role") {

                                                user.role = row['roles'][0].name
                                            }


                                            return (
                                                <TableCell key={column.id} align={column.align}>

                                                    {column.format && typeof values === "boolean"
                                                        ? column.format(values)
                                                        : (column.label == 'role' ? row['roles'][0].name : (typeof values == 'number' && column.label == 'Active' ? '' : values))
                                                    }

                                                    {
                                                        column.label == 'Active' && enableBanned == true &&
                                                        <Switch value={row['active'] == 0 ? 1 : 0} checked={row['active'] == 0 ? false : true} onChange={(e) => { setChecked(!row['active']); switchHandler({ active: e.target.value }, user.id); }} />

                                                    }

                                                    {
                                                        column.label == 'Active' && enableBanned == false &&
                                                        <Switch disabled value={row['active'] == 0 ? 1 : 0} checked={row['active'] == 0 ? false : true} onChange={(e) => { setChecked(!row['active']); switchHandler({ active: e.target.value }, user.id); }} />

                                                    }


                                                    {
                                                        column.label === 'Action' && <>
                                                            {enableRemove ? <Tooltip title="Delete" >
                                                                <IconButton onClick={() => { removeUser(user.id); }}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Tooltip> : <Tooltip title="Delete" >
                                                                <IconButton disabled onClick={() => { removeUser(user.id); }}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Tooltip>}
                                                            <Tooltip title="Edit">
                                                                <FormDialog user={user} pageType={pageType} getData={getData} page={page} rowsPerPage={rowsPerPage} column={columnData} keyword={keyword}></FormDialog>
                                                            </Tooltip>
                                                        </>
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </TableUI>
            </TableContainer>
            <Grid container>
                <Grid xs={4}>
                    <Pagination count={Math.ceil(total / rowsPerPage)} page={page} onChange={handleChange} />
                </Grid>
                <Grid xs={6}></Grid>
                <Grid xs={2}>

                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-simple-select-label" variant="standard">Records</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={rowsPerPage}
                            label="row"
                            onChange={(e) => setRowsPerPage(Number(e.target.value))}
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Table