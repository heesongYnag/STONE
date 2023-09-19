import React, { useState, useEffect } from "react";

import axios from "axios";
import "devextreme/dist/css/dx.light.css";

import {
  DataGrid,
  Column,
  ColumnFixing,
  Editing,
  Paging,
} from "devextreme-react/data-grid";

export default function Test() {
  const [employees, setEmployees] = useState([]); // 배열

  const [isSuccess, setIsSuccess] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/getData").then((res) => {
      setEmployees(res.data);
    });
  }, [isSuccess]);

  function onSubmit(e) {
    const rowData = e.changes[0];
    const { data, type } = rowData;
    if (!e.changes[0]) return;

    if (type === "insert") {
      axios.post("http://localhost:3000/insert",  data).then(
        (res) => {
          setIsSuccess(isSuccess + 1);
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (type === "update") {
      axios.post("http://localhost:3000/update",  data).then(
        (res) => {
          setIsSuccess(isSuccess + 1);
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (type === "remove") {
      const id = e.changes[0].key;
      axios.post("http://localhost:3000/delete", {id,tableName}).then(
        (res) => {
          setIsSuccess(isSuccess + 1);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  const tableName = "employees";
  useEffect(() => {
    axios.get("http://localhost:3000/getData").then((response) => {
      setEmployees(response.data);
    });
  }, [isSuccess]);
  return (
    <div>
      <h4>데이타그리드를 활용한 CRUD</h4>

      <DataGrid
        dataSource={employees}
        keyExpr={"id"}
        onSaved={(e) => {
          onSubmit(e);
        }}
      >
        <Column dataField="id" visible={false} />
        <Column dataField="name" fixed={true} caption="이름" />
        <Column dataField="job_position" />
        <Column dataField="department" />
        <Column dataField="email" />
        <Column dataField="phone" />

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