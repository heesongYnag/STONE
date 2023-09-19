import React, { useState, useEffect } from "react";

import axios from "axios";

import { InsertForm } from "./component";

import "devextreme/dist/css/dx.light.css";
import { DataGrid, Column, Editing } from "devextreme-react/data-grid";

export default function Test() {
  const [employees, setEmployees] = useState([]); // 배열
  const [employee, setEmployee] = useState({}); //객체
  const [isSuccess, setIsSuccess] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/getData").then((res) => {
      setEmployees(res.data);
    });
  }, [isSuccess]);
  function onSaved(e) {
    if (!e.changes[0]) return;

    const rowData = e.changes[0];
    const { data, type } = rowData;

    console.log(rowData);
    console.log('rowData.type : '+rowData.type);

    if (type === 'insert') {

      console.log('insert ...');
    }
    else if (type === 'update'){
      console.log('updaTE .....');

    }


  }

  return (
    <div>
      <h4>데이타그리드연습</h4>

      <DataGrid
        dataSource={employees}
        keyExpr={"id"}
        onSaved={(e) => {
          onSaved(e);
        }}
      >
        <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
        />
        <Column dataField="id" visible={false} />
        <Column dataField="name" />
        <Column dataField="job_position" />
        <Column dataField="department" />
        <Column dataField="email" />
        <Column dataField="phone" />
      </DataGrid>
    </div>
  );
}
