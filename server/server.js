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
app.use("/", serveStatic(path.join(__dirname, "../dist")));

// создаем соединение с нашей базой данных
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});
try {
  connection.connect((err) => {
    if (err) {
      console.warn(err);
    } else console.log("Успешно соединено с базой данных");
  });
} catch (err) {
  console.warn(err);
}

// При получении любого пути возвращать index.html из папки dist
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// При корневом пути возвращать index.html из папки dist
app.get("/", (req, res) => {
  res.sendFile(__dirname, "../dist/index.html");
});

const sql_news = `SELECT * FROM news`;

connection.query(sql_news, function(err, results) {
  if(err) console.log(err);
  console.log(results);
});
app.listen(3001, () => {
  console.log("Сервер запущен на http://localhost:3001");
});
