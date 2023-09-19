import './table.css'

function TableComponent({ emp, company, num }) {
  return (

    <div className='tableBox'  >
      <div className='title'  >{company} 사원 목록</div>
      <table border={1}>
        <thead>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>직급</th>
            <th>부서</th>
            <th>이메일</th>
            <th>연락처</th>
          </tr>
        </thead>
        <tbody>
          {
            emp.map((employees, index) => (
              <tr key={index}>
                <td> {employees.id}</td>
                <td> {employees.name}</td>
                <td> {employees.department}</td>
                <td> {employees.position}</td>
                <td> {employees.email}</td>
                <td> {employees.phone}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  )

}


export default TableComponent;