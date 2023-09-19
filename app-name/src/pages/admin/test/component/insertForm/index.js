import React from "react";
import axios from "axios";

function EmployeeForm({ employee, setEmployee, isSuccess, setIsSuccess }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log('11111');
    
    e.preventDefault(); //기본동작 스톱
    //return;

    // 서버로 데이터를 보내는 코드를 여기에 추가합니다.
    axios.post("http://localhost:3000/insert", employee).then(
      (res) => {
       // setIsSuccess(isSuccess + 1);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div className="insert_employee">
      <div className="grid-container">
        <label htmlFor="id">ID</label>
        <input
          type="text"
          name="id"
          onChange={handleChange}
          value={employee?.id || ""}
        />

        <label htmlFor="name">이름</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={employee?.name || ""}
        />

        <label htmlFor="job_position">직책</label>
        <input
          type="text"
          name="job_position"
          onChange={handleChange}
          value={employee?.job_position || ""}
        />

        <label htmlFor="department">부서</label>
        <input
          type="text"
          name="department"
          onChange={handleChange}
          value={employee?.department || ""}
        />

        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={employee?.email || ""}
        />

        <label htmlFor="phone">전화번호</label>
        <input
          type="text"
          name="phone"
          onChange={handleChange}
          value={employee?.phone || ""}
        />
      </div>
      <button type="button" onClick={handleSubmit}>
        제출
      </button>
    </div>
  );
}

export default EmployeeForm;
