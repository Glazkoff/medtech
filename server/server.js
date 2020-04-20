const express = require("express");
const serveStatic = require("serve-static");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path");
const dbConfig = require("./db.config.js");

const app = express();

// Парсинг json
app.use(bodyParser.json());

// парсит запросы по типу: application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Обработка статических файлов
app.use("/", serveStatic(path.join(__dirname, "../dist/medtech")));

// настройка CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
  next();
});

// создаем соединение с нашей базой данных
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  charset: 'utf8_general_ci'
});
try {
  connection.connect((err) => {
    if (err) {
      console.warn(err);
    } else {
      console.log("Успешно соединено с базой данных");
      connection.query('SET NAMES "utf8"')
      connection.query('SET CHARACTER SET "utf8"')
      connection.query('SET SESSION collation_connection = "utf8_general_ci"')
    }
  });
} catch (err) {
  console.warn(err);
}

//***********************************/
//*** Ниже пишется только API!!!! ***/
//***********************************/

// При получении любого пути возвращать index.html из папки dist
// app.get(/.*/, function (req, res) {
//   res.sendFile(path.join(__dirname, "../dist/index.html"));
// });
//
// // При корневом пути возвращать index.html из папки dist
// app.get("/", (req, res) => {
//   res.sendFile(__dirname, "../dist/index.html");
// });

app.post("/api/posts", (req, res) => {
  // res.sendFile(__dirname, "../dist/index.html");
  if (!req.body) return res.sendStatus(400);
  console.log('Пришёл POST запрос для постов:');
  console.log(req.body);

  connection.query('INSERT INTO `materials` (`duration`, `date`, `type`, `title`, `content`) VALUES ("1 час", ?, "news", ?, ?)',
    [req.body.time, "Название статьи", JSON.stringify(req.body.blocks)],
    function (err, results) {
      console.log('БД результаты:');
      if (err) {
        console.log('Ошибка записи в БД!');
        console.warn(err);
      } else {
        console.log(results);
      }
    });
});
app.get('/api/posts', function (req, res) {
  try {
    connection.query('SELECT * FROM `materials`', function (error, results, fields) {
      if (error) {
        res.status(500).send('Ошибка сервера при получении постов')
        console.log(error);
      }
      console.log('РЕЗУЛЬТАТЫ');
      console.log(results);
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
});


// rest api to get a single employee data
// app.get('/news/:id', function (req, res) {
//   connection.query('SELECT * FROM `materials` WHERE  id=?', [req.body.id], function (error, results, fields) {
//     if (error) throw error;
//     res.end(JSON.stringify(results));
//   });
// });





app.listen(3001, () => {
  console.log("Сервер запущен на http://localhost:3001");
});
