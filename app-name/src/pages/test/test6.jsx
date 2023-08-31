//import employees from "./data/employees";

import "devextreme/dist/css/dx.light.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DataGrid,
  Column,
  ColumnFixing,
  Filterrow,
  SearchPanel,
} from "devextreme-react/data-grid";

function Test6() {
  

  const [showPhone, setShowPhone] = useState(false);
  const [employees, setEmployees] = useState([]);

  function showTogle() {
    setShowPhone(!showPhone);
  }

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    const url = 'https://jsonplaceholder.typicode.com/users' ;
    axios
      .post('http://localhost:3000/getData',{url})
      .then((res) => {
        setEmployees(res.data);

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h2>Test6</h2>
      <button onClick={showTogle}>전화번호 보기</button>
      <button onClick={getData}>자료가져오기</button>
      <DataGrid dataSource={employees} keyExpr="id">
        <Column dataField={"id"} width={50} />
        <Column dataField="name" width={100} />
        <Column dataField="phone" width={150} visible={showPhone} />
      </DataGrid>
    </div>
  );
}
export default Test6;
