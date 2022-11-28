import React, { useState } from 'react'
import $ from "jquery";

import ButtonAppBar from "../components/navbar.tsx";
import Table from "../components/table.tsx";
import Create from "../components/createForm.tsx"


function Admin() {
  const role = "admin";
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [column, setColumn] = useState("none");
  const [totalRecord, setTotalRecord] = useState(0);


  const getData = async (id, record,column,keyword) => {
    $.ajax({
      type: "GET",
      headers: { 'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')).access_token },
      url: `http://127.0.0.1:8000/api/users?page=${id}&records=${record}&column=${column}&keyword=${keyword}`,
      timeout: "3000",
      success: (data) => { setDatas(data.data); setTotalRecord(data.total); },
      error: (r) => {console.log(r)}
    })

  };



  return (
    <div>
      <ButtonAppBar role={role} />
      <Create setData={setDatas} pageType={"users"} page={page} rowsPerPage={rowsPerPage} column={column} setColumn={setColumn} keyword={keyword} setKeyword={setKeyword}/>
      <Table data={datas} total={totalRecord} getData={getData} pageType={"users"} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} column={column} setColumn={setColumn} keyword={keyword} setKeyword={setKeyword}  />
    </div>
  )
}

export default Admin