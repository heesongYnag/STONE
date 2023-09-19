import React, { useState, useContext } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../index';

function Login() {
  const {user, setUser} = useContext(AuthContext);
  const navigate = useNavigate();

  async function onsubmit() {    
   // console.log('user :', user); 
    try {
      const res = await axios.post('http://localhost:3000/login', user);
      if (res.data.success) {
        setUser(res.data.data);
        alert('로그인 성공');


        navigate('/');
      } else {
        alert('로그인 실패:' + res.data.message);
      }
    } catch (error) {
      alert('서버연결중 오류.');
      console.log(error);
    }
  }

  function handleChange(e) {
    // console.log('handle :', e.target);

    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="user login">
      <h6>로그인</h6>
      <div>
        <div>
          <label>이메일</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={user?.email ?? ''}
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={user?.password ?? ''}
          />
        </div>
      </div>
      <div className="links">
        <Link to="#">이메일 찾기</Link> |<Link to="#">비밀번호 찾기</Link> |
        <Link to="/signup">회원가입</Link>
      </div>
      <button onClick={onsubmit}>LOGIN</button>
    </div>
  );
}

export default Login;
