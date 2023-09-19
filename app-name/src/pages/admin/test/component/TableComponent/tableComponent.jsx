function TableComponent({empolyees,company}) {
        
  return (
    <div>
      <h4>{company} 사원목록</h4>
      <table border="1" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>ID      </th>
            <th>이름    </th>
            <th>직무    </th>
            <th>부서    </th>
            <th>이메일  </th>
            <th>전화번호</th>
          </tr>
        </thead>
        <tbody>
          {empolyees.map((employee) => {

            console.log(employee);
            return (
              <tr>
                <td>{employee.id}        </td>
                <td>{employee.name}      </td>
                <td>{employee.department}</td>
                <td>{employee.position}  </td>
                <td>{employee.email}     </td>
                <td>{employee.phone}     </td>
              </tr>
            )
          })}
        </tbody>

      </table>
    </div>
  );
}

export default TableComponent