import { TableComponent } from "./component"
import  empolyees from "./data/employees"

function Test2() {
  return (
    <div>
      <h1>Test2</h1>

      <TableComponent empolyees={empolyees} company={'더함소프트'}  />
    </div>
  )
}
export default Test2