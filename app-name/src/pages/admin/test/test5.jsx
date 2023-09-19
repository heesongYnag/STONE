import employees from "./data/employees";
import "devextreme/dist/css/dx.light.css";

import {
  DataGrid,
  Column,
  ColumnFixing,
  Filterrow,
  SearchPanel,
} from "devextreme-react/data-grid";

function Test5() {
  const number = employees.length;
  return (
    <div>
      <h2>Test5</h2>
      <DataGrid dataSource={employees} keyExpr={"id"} columnAutoWidth={true}>
        {/* <Filterrow visible={true}/> 
          <SearchPanel visible={true}/> */}
        <Column dataField="id" fixed={true} visible={false}></Column>
        <Column dataField="name" fixed={true}></Column>
        <Column dataField="position" width={300}></Column>

        <Column dataField="department" sortOrder={"asc"}></Column>
        <Column dataField="phone"></Column>
      </DataGrid>
    </div>
  );
}

export default Test5;
