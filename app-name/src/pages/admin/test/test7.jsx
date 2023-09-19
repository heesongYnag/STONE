import React, { useState, useEffect } from "react";
import { InsertForm } from "./component/index";

import "devextreme/dist/css/dx.light.css";
import {
  DataGrid,
  Column,
  RequiredRule,
  Editing,
} from "devextreme-react/data-grid";
//import employees from "./data/employees";  //파일에서 직접불러오는방법
import axios from "axios";

function Test7() {
  const [showId, setShowId] = useState(false);
  //const url = "https://jsonplaceholder.typicode.com/users";
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/getData").then((res) => {
      setEmployees(res.data);
    });
  }, []);

  function getFireBird() {
    axios.get("http://localhost:3000/getData").then((res) => {
      //console.log(res.data);
      setEmployees(res.data);
    });
  }

  return (
    <div>
      <h2>Test7</h2>
      <button onClick={getFireBird}>데이타가져오기</button>

      <InsertForm>
        employees = {employees}
        setEmployees = {setEmployees}
      </InsertForm>

      <DataGrid dataSource={employees} keyExpr={"id"} columnAutoWidth>
        <Column dataField="id" visible={false} />
        <Column
          dataField="name"
          alignment="right"
          sortOrder={"asc"}
          fixed={true}
        />

        <Column dataField="email">
          <RequiredRule />
        </Column>

        <Column dataField="phone"></Column>
        <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
        />
      </DataGrid>
    </div>
  );
}
export default Test7;
