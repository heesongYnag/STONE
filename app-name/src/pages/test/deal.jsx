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

function Deal() {
  const [showId, setShowId] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [deal, setDeal] = useState([]);
  
  function getFireData() {
    axios.get("http://localhost:3000/getFireBirdData").then((res) => {
      console.log(res.data);
      setDeal(res.data);
    });
  }

  function getFireDeal() {
    axios.get("http://localhost:3000/getFireBirdDeal").then((res) => {
      console.log(res.data);
      setDeal(res.data);
    });
  }


  return (
    <div>
      <h2>Deal</h2>
      <button onClick={getFireData}>데이타가져오기</button>
      <button onClick={getFireDeal}>거래자료(Deal)데이타가져오기</button>

      <InsertForm>
        deal = {deal}
        setDeal = {setDeal}
      </InsertForm>

      <DataGrid dataSource={deal} keyExpr={"de_no"} columnAutoWidth   
          allowColumnResizing={true}
          allowColumnReordering={true}
          showBorders={true}  
          rowAlternationEnabled={true}    // 격칸 줄색깔
           >
          
        <Column dataField="de_no" visible={false} />
        <Column
          dataField="de_date"
          caption="거래일자"
          width={100}
          alignment="right"
          sortOrder={"asc"}
          fixed={true}
        />

        <Column dataField="de_typedeal" width={100}  caption="거래구분"   >
          <RequiredRule />
        </Column>

        <Column dataField="de_cu_name" width={250} caption="거래처명" />

        <Column dataField="de_summary" width={300}  caption="적요사항" />
        <Column dataField="de_totalamt" width={200}   caption="매출금액"  dataType="number" format="Currency" />


        <Summary>
            <TotalItem
              column="de_cu_name"              
              summaryType="count" />
            <TotalItem
              column="de_totalamt"
              summaryType="sum"
              valueFormat="currency" />
          </Summary>


      </DataGrid>
    </div>
  );
}
export default Deal;
