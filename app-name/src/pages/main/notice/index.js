import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../main';

import { DataGrid, Column, Item, Toolbar } from 'devextreme-react/data-grid';
import axios from 'axios';

export default function Notice() {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const [content, setContent] = useState([]);

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    axios.get('http://localhost:3000/notice').then((res) => {
      setContent(res.data);
    });
  }, []);

  const handleRowClick = (e) => {
    const rowData = e.data; // 클릭된 행의 데이터
    navigate(`/notice/edit`, { state: { mode: 'update', data: rowData } });
  };
// 디자인 추가
const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

const onRowPrepared = (e) => {
  e.rowElement.addEventListener('mouseover', () => {
    setHoveredRowIndex(e.rowIndex);
  });
  e.rowElement.addEventListener('mouseout', () => {
    setHoveredRowIndex(null);
  });

  if (hoveredRowIndex === e.rowIndex) {
    e.rowElement.classList.add('hoverRow');
  } else {
    e.rowElement.classList.remove('hoverRow');
  }
};

  return (
    <div>
      <h2>공지사항</h2>
      <p> Hi {user?.name} ! </p>

      <DataGrid dataSource={content} keyExpr={'id'}
          onRowClick={handleRowClick}
          onRowPrepared={onRowPrepared}
      >
        <Column dataField="id" alignment="center" caption="번호"    />
        <Column dataField="title" alignment="center" caption="제목" />
        <Column dataField="author" alignment="center" caption="작성자" />
        <Column dataField="date" alignment="center" caption={'작성일자'} />

        <Toolbar>
          {user?.rank <= 20 ? (
            <Item
              widget="dxButton"
              options={{
                text: '쓰기',
                icon: 'add',
                onClick: () =>
                  navigate('/notice/edit', { state: { mode: 'new' } }),
              }}
              location="after"
            />
            )  :''
          }
        </Toolbar>
      </DataGrid>
    </div>
  );
}
