import React, { useState, useEffect } from 'react';

import axios from 'axios';
import 'devextreme/dist/css/dx.light.css';
import clipLoader from 'react-spinners/ClipLoader';

import {
  DataGrid,
  Column,
  ColumnFixing,
  Editing,
  Paging,
} from 'devextreme-react/data-grid';

export default function Test() {
  const [employees, setEmployees] = useState([]); // 배열
  const [isSuccess, setIsSuccess] = useState(0);

  const [loading, setLoading] = useState(false);
  const tableName = 'employees';

  useEffect(() => {
    console.log('시작');
    setLoading(true);
    setTimeout(() => {
      axios.get('http://localhost:3000/getData').then((res) => {
        setEmployees(res.data);
        console.log('종료');
        setLoading(false);
      });
    }, 3000);
  }, [isSuccess]);
  const LoadingIndicator = () => {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
          alt="Loading..."
          style={{ width: 100 }}
        />
      </div>
    );
  };

  function onInsert(e) {
    const data = e.data;
    console.log(data);

    axios
      .post('http://localhost:3000/insert', { data, tableName })
      .then((res) => {
        setIsSuccess(isSuccess + 1);
      });
  }

  function onUpdate(e) {
    console.log('onUpdate...');
    const data = e.data;
    console.log(data);
    axios
      .post('http://localhost:3000/update', { data, tableName })
      .then((res) => {
        setIsSuccess(isSuccess + 1);
      });
  }

  function onDelete(e) {
    console.log('onDelete...');
    const data = e.data;
    const id = data.id;
    console.log(data);
    axios
      .post('http://localhost:3000/delete', { id, tableName })
      .then((res) => {
        setIsSuccess(isSuccess + 1);
      });
  }

  return (
    <div>
      <h4>데이타그리드를 복습</h4>
      {loading && <LoadingIndicator />}
      <button onClick={() => setIsSuccess(isSuccess + 1)}>로딩중</button>
      <DataGrid
        dataSource={employees}
        keyExpr={'id'}
        onRowInserted={(e) => onInsert(e)}
        onRowUpdated={(e) => onUpdate(e)}
        onRowRemoved={(e) => onDelete(e)}
      >
        <Column dataField="id" visible={false} />
        <Column dataField="name" fixed={true} caption="이름" />
        <Column dataField="job_position" caption="직무" />
        <Column dataField="department" caption={'부서'} />
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
