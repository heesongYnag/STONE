const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 3000;
const Firebird = require("node-firebird");

const options = {
  host: "127.0.0.1",
  port: 3050,
  database: "C:/Deoham/mEasy/Data/mEasy.fdb", // 실제 경로설정
  user: "sysdba",
  password: "masterkey",
  lowercase_keys: true,
  role: null,
  pageSize: 4096,
  charset: "UTF8",
};

// CORS 미들웨어 적용
app.use(bodyParser.json());
 
app.use(
  cors({
    origin: "http://localhost:3001", // React 앱의 주소
  })
);

// 서버
app.post("/getData", async (req, res) => {

  const url = await req.body.url;
  axios.get(url).then((response) => {
    res.send(response.data);
  });
});

app.get("/getFireBirdData", async (req, res) => {
  Firebird.attach(options, function (err, db) {
    if (err) throw err;
    let sSql ="SELECT * FROM employees";
    console.log(sSql);
    db.query( sSql , function (err, result) {
      console.log(result);
      res.send(result);

      // 데이터베이스 연결 종료.
      db.detach();
    });
  });
});

app.get("/getFireBirdDeal", async (req, res) => {
  Firebird.attach(options, function (err, db) {
    if (err) throw err;
    let sSql = " SELECT de_no, de_date ,de_typedeal, de_cu_name , de_summary , de_totalamt FROM Deal ";
    console.log(sSql);
    db.query( sSql , function (err, result) {
      console.log(result);
      res.send(result);
      // 데이터베이스 연결 종료.
      db.detach();
    });
  });
});
  
app.get("/getFireBirdSale", async (req, res) => {
  Firebird.attach(options, function (err, db) {
    if (err) throw err;
    let sSql = " SELECT * FROM Sale ";
    console.log(sSql);
    db.query( sSql , function (err, result) {
      console.log(result);
      res.send(result);
      // 데이터베이스 연결 종료.
      db.detach();
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is http://localhost:${PORT}`);
});
