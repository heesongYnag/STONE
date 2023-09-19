// edit.jsx
import React, { useState, useContext, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
// 로그인 정보 context에 담기
import { AuthContext } from '..';

import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import Toolbar1 from 'devextreme-react/toolbar';
import notify from 'devextreme/ui/notify';

import './edit.scss';

function Edit() {
  const navigate = useNavigate();
  const editorRef = useRef(null);

  // 새로운 글쓰기 인지 수정인지 구분
  const location = useLocation();
  const mode = location.state?.mode || 'update';

  const [title, setTitle]     = useState(location.state?.data?.title ?? '');
  const [content, setContent] = useState(location.state?.data?.content ?? '');

  // 로그인 정보 context에 담기
  const { user } = useContext(AuthContext);

  // 에디터 옵션
  const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
  const fontValues = [
    'Arial',
    'Courier New',
    'Georgia',
    'Impact',
    'Lucida Console',
    'Tahoma',
    'Times New Roman',
    'Verdana',
  ];
  const fontSizeOptions = {
    inputAttr: {
      'aria-label': 'Font size',
    },
  };
  const fontFamilyOptions = {
    inputAttr: {
      'aria-label': 'Font family',
    },
  };

  // 확인 버튼
  const handleConfirm = () => {
    const editorValue = editorRef.current?.instance?.option('value');

    if (!title) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!editorValue) {
      alert('내용을 입력해주세요.');
      return;
    }

    // 기존 값이 있으면 그 값을 사용 || 새로운 글씨기의 경우에는 현재 date를 기준으로 id 생성
    const id = location.state?.data?.id || new Date().getTime();
    const data = {
      id: id,
      title: title,
      author: user.name,
      content: editorValue,
    };

    if (mode === 'new') {
      // 새로운 글쓰기
      axios
        .post('http://localhost:3000/notice/new', data)
        .then((response) => {
          console.log( ' R :',response)
          if (response.data) {
            showMessage('글이 등록되었습니다.');
            navigate('/notice');
          } else {
            alert('글 등록 실패: ' + response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else {

      // 수정
      axios
      .post('http://localhost:3000/notice/update', data)
      .then((response) => {
        console.log( ' U :',response)
        if (response.data) {
          showMessage('글이 수정되었습니다.');
          navigate('/notice');
        } else {
          alert('글 등록 실패: ' + response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });




    }
  };

  // 취소 버튼
  const handleCancel = () => {
    navigate('/notice');
  };

  // 결과 내용 화면에 보여주기
  const showMessage = (message) => {
    notify(
      {
        message: message,
        width: 230,
        position: {
          at: 'center',
          my: 'top',
          of: '.notice', // 어디에 띄울지
        },
      },
      'success',
      500
    );
    // ['error', 'info', 'success', 'warning'];
  };
// 삭제
const handleDelete = () => {
	// 정말 삭제할 것인지 확인
  if (!window.confirm('정말 삭제하시겠습니까?')) {
    return;
  }
	
  const id = location.state?.data?.id; // 문서 id
  
  axios.post('http://localhost:3000/notice/delete', { id })
  .then((res) => {
    if (res.data) {
      showMessage('게시글이 삭제되었습니다.')
      navigate('/notice');
    } else {
      alert('글 삭제 실패: ' + res.data.message);
    }
  })
  .catch((error) => {
    console.log(error)
    alert(error);
  });
};
  return (
    <div className="notice" id="notice">
      <h2>글쓰기</h2>
      <Toolbar1
        style={{
          padding: '10px',
          backgroundColor: 'transparent',
        }}
      >
        <Item
          widget="dxButton"
          options={{
            text: '취소',
            onClick: handleCancel,
            stylingMode: 'outlined',
          }}
          location="after"
        />
        <Item
          widget="dxButton"
          options={{
            text: '확인',
            onClick: handleConfirm,
            stylingMode: 'contained',
            type: 'success',
          }}
          location="after"
        />
        	<Item
	  widget="dxButton"
	  options={{ text: "삭제", onClick: handleDelete, stylingMode: 'outlined', type: 'danger' }}
	  location="after"
	/>
      </Toolbar1>
      {/* 제목 */}
      <div className="title">
        <label>제목</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="editor widget-container">
        <HtmlEditor
          height="600px"
          width="1000px"
          ref={editorRef}
          defaultValue={mode === 'update' ? content : ''}
        >
          <Toolbar>
            <Item name="undo" />
            <Item name="redo" />
            <Item name="separator" />
            <Item
              name="size"
              acceptedValues={sizeValues}
              options={fontSizeOptions}
            />
            <Item
              name="font"
              acceptedValues={fontValues}
              options={fontFamilyOptions}
            />
            <Item name="separator" />
            <Item name="bold" />
            <Item name="italic" />
            <Item name="strike" />
            <Item name="insertTable" />
            <Item name="deleteTable" />
            <Item name="underline" />
            <Item name="separator" />
            <Item name="alignLeft" />
            <Item name="alignCenter" />
            <Item name="alignRight" />
            <Item name="alignJustify" />
            <Item name="separator" />
            <Item name="orderedList" />
            <Item name="bulletList" />
            <Item name="separator" />
            <Item name="color" />
            <Item name="background" />
          </Toolbar>
        </HtmlEditor>
      </div>
    </div>
  );
}
    
export default Edit;
