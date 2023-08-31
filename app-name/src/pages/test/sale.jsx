import React, { useState, useEffect } from "react";
import { InsertForm } from "./component/index";
import "devextreme/dist/css/dx.light.css";
import {
  DataGrid,
  Column,
  RequiredRule,
  Editing,
  Selection, 
  Summary, 
  TotalItem,
} from "devextreme-react/data-grid";
import axios from "axios";

function Sale() {
  const [showId, setShowId] = useState(false);
  const [sale, setSale] = useState([]);

  function getFireSale() {
    console.log('getFireSale');
    
    axios.get("http://localhost:3000/getFireBirdSale").then((res) => {
      console.log(res.data);
      setSale(res.data);
    });
  }

  return (
    <div>
      <h2>Sale</h2>
      <button onClick={getFireSale}>매출5자료(Sale)데이타가져오기</button>

      <DataGrid dataSource={sale} keyExpr={"sa_no"} columnAutoWidth>
        <Column dataField="sa_no" visible={false} />
        <Column
          dataField="sa_date"
          width={100}
          alignment="right"
          sortOrder={"asc"}
          fixed={true}
        />
        <Column dataField="sa_cu_name" caption="거래처명" width={200}></Column>

        <Column dataField="sa_typedeal" width={50}>
          <RequiredRule />
        </Column>

        <Column dataField="sa_pr_item" caption="품목명" width={100}></Column>

        <Column dataField="sa_qty"  caption="수량" format="#,##0"  width={50}  />
        <Column dataField="sa_price" caption="단가" format="#,##0"  width={150} />
        <Column dataField="sa_totalamt" caption="매출금액" width={200}   format="#,##0" dataType="number"  />

        <Summary>
            <TotalItem
              column="sa_cu_name"  
              format="#,##0"            
              summaryType="count" />
            <TotalItem
              column="sa_totalamt"
              summaryType="sum"
              format="#,##0"
               />
          </Summary>


      </DataGrid>
    </div>
  );
}
export default Sale;
