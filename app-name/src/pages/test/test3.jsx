import { TableComponent } from "./component"
import  empolyees from "./data/employees"

function test3() {
  return (
    <div>
      <h1>Test3</h1>
      <TableComponent empolyees={empolyees} company={'오경정보시스템'}  />
    </div>
  )
}
export default test3