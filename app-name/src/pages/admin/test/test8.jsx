import React, { useState, useEffect } from "react";

import axios from "axios";

import { InsertForm } from "./component";

import "devextreme/dist/css/dx.light.css";
import {
  DataGrid,
  Column,
  RequiredRule,
  Editing,
} from "devextreme-react/data-grid";

export default function Test() {
  const [employees, setEmployees] = useState([]); // 배열
  const [employee, setEmployee] = useState({}); //객체
  const [isSuccess, setIsSuccess] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/getData").then((res) => {
      setEmployees(res.data);
    });
  }, [isSuccess]);

  return (
    <div>
      <h4>데이타그리드연습</h4>
      <InsertForm
        employee={employee}
        setEmployee={setEmployee}
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
      />
      <DataGrid dataSource={employees} keyExpr={"id"}></DataGrid>
    </div>
  );
}
