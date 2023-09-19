const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

const multer = require('multer');
const fs     = require('fs');
const path   = require('path');


// CORS 미들웨어 적용..최상위에 있어야 한다
app.use(bodyParser.json());

app.use(
  cors({
    origin: 'http://localhost:3001', // React 앱의 주소
  })
);

// 파일 업로드
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const menuPath = req.url.split('/')[1]
    const uploadPath = `uploads/${menuPath}/`

    // 디렉토리가 있는지 확인하고 없으면 생성
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath); // 파일 저장 위치 설정
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // 저장할 파일명 설정
  },
});

const upload = multer({ storage: storage });

// 이후 업로드 폴더에 있는 이미지 불러올 때 사용
 app.get('/uploads/*', (req, res) => {
   const filePath = req.params[0];
   res.sendFile(path.join(__dirname, 'uploads/', filePath));
 });

//파일 업로드
app.post('/user/upload', upload.single('file'), (req, res) => { 
   console.log('res : ',res);

   res.json({ success: true, path: req.file.path, message:'이미지업로드' });
   console.log('---res : ');

 });

 
// 파일 삭제
app.post("/user/delete-image", async (req, res) => {
  try {    
    const { profile_url } = req.body;
    const imagePath = path.join(__dirname, "./", profile_url); // 이미지의 절대 경로를 구합니다.
    console.log('profile_url : ',profile_url)
    console.log('imagePath : ',imagePath)

    fs.unlink(imagePath, (err) => { // 파일 삭제
      if (err) {
        return res.status(500).json({ success: false, message: err });
      }
      res.json({ success: true, message: "이미지가 삭제되었습니다." });
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "서버 오류" });
  }
});


const options = {
  host: '127.0.0.1',
  port: 3050,
  database: 'C:/Deoham/mEasy/Data/mEasy.fdb', // 실제 경로설정
  user: 'sysdba',
  password: 'masterkey',
  lowercase_keys: true,
  role: null,
  pageSize: 4096,
  charset: 'UTF8',
};

// DB 연결
const Firebird = require('node-firebird');

let db;

Firebird.attach(options, (err, database) => {
  if (err) throw err;
  db = database;
});




// 서버
// app.post("/getData", async (req, res) => {

//   const url = await req.body.url;
//   axios.get(url).then((response) => {
//     res.send(response.data);
//   });
// });

app.get('/getData', async (req, res) => {
  db.query('SELECT * FROM employees', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }

    res.send(result);
  });
});

app.get('/getFireBirdDeal', async (req, res) => {
  Firebird.attach(options, function (err, db) {
    if (err) throw err;
    let sSql =
      ' SELECT de_no, de_date ,de_typedeal, de_cu_name , de_summary , de_totalamt FROM Deal ';
    console.log(sSql);
    db.query(sSql, function (err, result) {
      console.log(result);
      res.send(result);
      // 데이터베이스 연결 종료.
      // db.detach();
    });
  });
});

app.get('/getFireBirdSale', async (req, res) => {
  Firebird.attach(options, function (err, db) {
    if (err) throw err;
    let sSql = ' SELECT * FROM Sale ';
    console.log(sSql);
    db.query(sSql, function (err, result) {
      console.log(result);
      res.send(result);
      // 데이터베이스 연결 종료.
      //db.detach();
    });
  });
});

app.post('/insert', async (req, res) => {
  console.log(req.body);
  const { data, tableName } = req.body;
  const keys = Object.keys(data);
  const values = Object.values(data);

  const query = `insert into ${tableName} ( ${keys.join(',')})
                 values (${keys.map((key) => '?').join(',')})
                `;

  //return
  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500).send('서버오류');
      res.send('fail');
      return;
    }
  });
});

app.post('/signup', async (req, res) => {
  console.log(req.body);
  const user = req.body;
  const keys = Object.keys(user);
  const values = Object.values(user);

  const query = `
                 INSERT INTO Users (${keys.join(', ')})
                  VALUES (${keys.map(() => '?').join(', ')})
                  `;
  console.log('qry : ' + query);

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500).send('서버오류');
      res.send('fail');
      return;
    }

    console.log('query 적용');
  });
  return;

  db.execute(query, values, (err, result) => {
    afterQuery(err, res);
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ success: false, message: '이메일과 비번을 입력하세요.' });
    return;
  }
  const query = ` select * from users where email =? and password =?     `;

  db.query(query, [email, password], (err, result) => {
    console.log('result : ', result);

    if (err) {
      res.status(500).send('내부 서버 오류');
      return;
    }

    if (result.length === 0) {
      res.json({ success: false, message: '이메일 비번 불일치' });
      return;
    }
    res.json({ success: true, message: 'login 성공', data: result[0] });
  });
});

app.post('/update', async (req, res) => {
  console.log(req.body);
  const { data, tableName } = req.body;
  const keys = Object.keys(data);
  const values = Object.values(data);

  const query = `update ${tableName} 
               set ${keys.map((keys) => `${keys}=?`).join(',')}
               where id = ?             
               `;
  console.log('qry : ' + query);
  //return
  db.query(query, [...values, data.id], (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500).send('서버오류');
      res.send('fail');
      return;
    }
  });
});

app.post('/delete', async (req, res) => {
  console.log(req.body);

  const { id, tableName } = req.body;
  const query = `delete  from ${tableName} 
                where id = ?             
               `;

  //return
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500).send('서버오류');
      res.send('fail');
      return;
    }

    res.json({
      success: true,
      message: '로그인 성공..',
      data: resutl[0],
    });
  });
});

app.get('/notice', async (req, res) => {
  db.query(' select * from notice ', (err, result) => {
    afterQuery(err, res, result);

    if (err) {
      console.error(err);
      res.sendStatus(500).send('서버오류');
      res.send('fail');
      return;
    }
  });
});

app.post('/notice/new', async (req, res) => {
  console.log(req.body);

  const data = req.body;
  const keys = Object.keys(data);
  const values = Object.values(data);

  const query = `insert into notice (${keys.join(',')})
                 VALUES (${keys.map(() => '?').join(', ')}) 
                 `;

  //return
  db.execute(query, values, (err) => {
    afterQuery(err, res);
  });
});

app.post('/notice/update', async (req, res) => {
  console.log(req.body);
  const data = req.body;
  const keys = Object.keys(data);
  const values = Object.values(data);

  const query = `update notice  
                 set ${keys.map((keys) => `${keys}=?`).join(',')}
                 where id = ?             
                 `;

  //return
  db.query(query, data.id, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500).send('서버오류');
      res.send('fail');
      return;
    }
  });
});

app.post('/notice/delete', async (req, res) => {
  console.log(req.body);
  const data = req.body;
  const keys = Object.keys(data);
  const values = Object.values(data);

  const query = `delete from  notice                   
                 where id = ?             
                 `;

  //return
  db.query(query, data.id, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500).send('서버오류');
      res.send('fail');
      return;
    } else {
      res.send('success');
    }
  });
});

function afterQuery(err, res, result) {
  if (err) {
    console.err(err);
    res.status(500).send('인터널 서버 오류');
    res.send('Fail');
    return;
  }

  if (result) {
    res.send(result);
    return;
  }

  res.send('success');
}

app.post('/user/update', async (req, res) => {
  console.log('BODY: ', req.body);
  const data = req.body;
  const userId = req.body.id;
  let dataToUpdate = { ...req.body };

  // "id"를 업데이트 데이터에서 제거
  delete dataToUpdate.id;
  const keys = Object.keys(data);
  const values = Object.values(data);

  const query = `update users  
               set ${keys.map((keys) => `${keys}=?`).join(',')}
               where id = ?             
               `;
  console.log('query > : ' + query);
  //return
  db.query(query, [...values, userId], (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500).send('서버오류');
      res.send('fail');
      return;
    }
    res.send('success');
  });
});



app.listen(PORT, () => {
  console.log(`Server is http://localhost:${PORT}`);
});

// // 서버가 종료될 때 데이터베이스 연결을 닫습니다.
// process.on("SIGINT", () => {
//   db.detach();
//   process.exit(0);
// });
