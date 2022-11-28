import React, { useContext, useState } from 'react'
import $ from "jquery";
import ButtonAppBar from '../components/navbar.tsx'
import { AuthContext } from '../context/authContext/AuthContext'
import Table from "../components/table.tsx"
import Create from "../components/createForm.tsx"
function QLHT() {
  const { user } = useContext(AuthContext);
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [column, setColumn] = useState("none");
  const [totalRecord, setTotalRecord] = useState(0);

  const getData = async (id, record,column,keyword) => {
    $.ajax({
      type: "GET",
      headers: {
        'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')).access_token, 'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
      url: `http://127.0.0.1:8000/api/students?page=${id}&records=${record}&column=${column}&keyword=${keyword}`,
      timeout: "3000",
      success: (data) => { setDatas(data.data); setTotalRecord(data.total); },
      error: (e) => console.log(e)
    })
    // await axios.get('http://localhost:8000/api/users?page='+id)
    //   .then((response) => {
    //     setRows(response.data.data);
    //     setRowsPerPage(response.data.per_page)
    //     // setPage(response.data.current_page);
    //     console.log(rows)
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .finally(function () {
    //     // always executed
    //   });
  };


  return (
    <div>
      <ButtonAppBar />
      <Create setData={setDatas} pageType={"students"} page={page} rowsPerPage={rowsPerPage} column={column} setColumn={setColumn} keyword={keyword} setKeyword={setKeyword}/>
      <Table data={datas} total={totalRecord} getData={getData} pageType={"students"} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} column={column} setColumn={setColumn} keyword={keyword} setKeyword={setKeyword} />
    </div>
  )
}

export default QLHT