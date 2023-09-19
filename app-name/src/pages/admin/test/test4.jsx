import employees from "./data/employees";

import TableComponent1 from "./component/TableComponent/tableComponent1";

function Test4() {
   const number =employees.length;

  //console.log(employees);
  return (
    <div>
      <h2>Test4</h2>
      <h2>인원수 {number} </h2>
      <TableComponent1 
         emp={employees}  
         company='더함소프트' 
         num = {number}
         />
    </div>
  )
}

export default Test4