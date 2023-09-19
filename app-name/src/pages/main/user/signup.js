import React, { useState } from 'react';
import './signup.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUP() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    address_detail: '',
    birth: '',
    gender: ''
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState({}); // 에러 메시지 상태

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === 'password_confirm') {
      setPasswordConfirm(value);
    } else {
      setUser(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }

  function validateForm() {
    let isValid = true;
    let tempErrors = {};

    if (!user.email) {
      isValid = false;
      tempErrors.email = '이메일은 필수 항목입니다.';
    }

    if (!user.password) {
      isValid = false;
      tempErrors.password = '비밀번호는 필수 항목입니다.';
    }

    if (!user.name) {
      isValid = false;
      tempErrors.name = '이름은 필수 항목입니다.';
    }

    if (user.password !== passwordConfirm) {
      isValid = false;
      tempErrors.password_confirm = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(tempErrors);
    return isValid;
  }


  function onsubmit() {
    // 유효성 검사
    if (!validateForm()) {
      return;
    }
   
    axios.post('http://localhost:3000/signup', user)
      .then(res => {
        console.log(res);
        
        alert('회원가입이 완료되었습니다.');
        // 으로 이동
        navigate('/login');
      })
      .catch(err => {
        console.log(err);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      });
  }

  return (
    <div className="user signup">
      <h6>회원가입</h6>
      <div>
        <div>
          <label>이메일</label>
          <input type="text" name="email" onChange={handleChange} />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" name="password" onChange={handleChange} />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input type="password" name="password_confirm" onChange={handleChange} />
          {errors.password_confirm && <p className="error-message">{errors.password_confirm}</p>}
        </div>
        <div>
          <label>이름</label>
          <input type="text" name="name" onChange={handleChange} />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div>
          <label>핸드폰</label>
          <input type="text" name="phone" onChange={handleChange} />
        </div>
        <div>
          <label>주소</label>
          <input type="text" name="address" onChange={handleChange} />
        </div>
        <div>
          <label>상세주소</label>
          <input type="text" name="address_detail" onChange={handleChange} />
        </div>
        <div>
          <label>생년월일</label>
          <input type="text" name="birth" onChange={handleChange} />
        </div>
        <div>
          <label>성별</label>
          <input type="text" name="gender" onChange={handleChange} />
        </div>
      </div>
      <button onClick={onsubmit}>확인</button>
    </div>
  );
}

export default SignUP;