"use strict";
const express = require("express");
const serveStatic = require("serve-static");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path");
const dbConfig = require("./db.config.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const CONFIG = require("./secret.config.js");
const morgan = require("morgan");

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

// Логгирование запросов
app.use(morgan("dev"));

// настройка CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, PUT, POST, DELETE, OPTIONS"
  );
  next();
});

// создаем соединение с нашей базой данных
const connection = mysql.createPool({
  connectionLimit: 10,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  charset: "utf8_general_ci",
});
connection.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  } else {
    connection.query('SET NAMES "utf8"');
    connection.query('SET CHARACTER SET "utf8"');
    connection.query('SET SESSION collation_connection = "utf8_general_ci"');
    console.log("Успешно соединено с БД");
  }
  if (connection) connection.release();
});
// try {
//   connection.connect((err) => {
//     if (err) {
//       console.warn(err);
//     } else {
//       console.log("Успешно соединено с базой данных");
//       connection.query('SET NAMES "utf8"');
//       connection.query('SET CHARACTER SET "utf8"');
//       connection.query('SET SESSION collation_connection = "utf8_general_ci"');
//     }
//   });
// } catch (err) {
//   console.warn(err);
// }

let salt = bcrypt.genSaltSync(10);

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

/******************************************************************** */
/** CRUD для новостных постов */

// Создание новостного поста
app.post("/api/posts", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для постов:");
  console.log(req.body);
  connection.query(
    'INSERT INTO `materials` (`duration`, `date`, `type`, `title`, `content`) VALUES (?, ?, "news", ?, ?)',
    [
      req.body.duration,
      req.body.content.time,
      req.body.title,
      JSON.stringify(req.body.content.blocks),
    ],
    function (err, results) {
      console.log("БД результаты:");
      if (err) {
        console.log("Ошибка записи в БД!");
        console.warn(err);
      } else {
        console.log(results);
      }
    }
  );
});

// Получение списка новостных постов
app.get("/api/posts", (req, res) => {
  console.log("AUTHORIZATION: ", req.headers.authorization);
  try {
    connection.query("SELECT * FROM `materials`", function (
      error,
      results,
      fields
    ) {
      if (error) {
        res.status(500).send("Ошибка сервера при получении постов");
        console.log(error);
      }
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
});

// Получение конкретного поста
app.get("/api/posts/:id", (req, res) => {
  console.log(req.params.id);
  try {
    connection.query(
      "SELECT * FROM `materials` WHERE id_materials = ?",
      [req.params.id],
      function (error, results, fields) {
        if (error) {
          res.status(500).send("Ошибка сервера при получении постов");
          console.log(error);
        }
        console.log("РЕЗУЛЬТАТЫ");
        console.log(results);
        res.json(results);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Редактирование конкретного поста
app.put("/api/posts/:id", (req, res) => {
  console.log("PUT /");
  console.log(req.body);
  console.log(
    req.body.duration,
    req.body.content.time,
    req.body.title,
    JSON.stringify(req.body.content.blocks),
    req.params.id
  );
  try {
    connection.query(
      "UPDATE `materials` SET `duration` = ?, `date` = ?, `title` = ?, `content` = ? WHERE id_materials = ?",
      [
        req.body.duration,
        req.body.content.time,
        req.body.title,
        JSON.stringify(req.body.content.blocks),
        req.params.id,
      ],
      function (error, results, fields) {
        if (error) {
          res.status(500).send("Ошибка сервера при получении названия курса");
          console.log(error);
        }
        console.log("РЕЗУЛЬТАТЫ");
        console.log(results);
        res.json(results);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/posts/:id", (req, res) => {
  try {
    connection.query(
      "DELETE FROM `materials` WHERE id_materials = ?",
      [
        req.params.id,
      ],
      function (error, results, fields) {
        if (error) {
          res.status(500).send("Ошибка сервера при получении названия курса");
          console.log(error);
        } else {
          res.send({
            message: `Удалена запись с ID ${req.params.id}`
          })
        }
      })
  } catch (err) {
    console.log(err);
  }
});
/******************************************************************** */

// Регистрация пользователя
app.post("/api/users", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для пользователей:");
  console.log(req.body);
  connection.query(
    `SELECT * FROM users WHERE login='${req.body.login}'`,
    function (error, results) {
      if (error) {
        res
          .status(500)
          .send(
            "Ошибка сервера при получении пользователей с таким же логином"
          );
        console.log(error);
      }
      console.log("Результаты проверки существования логина:");
      console.log(results);
      if (results[0] === undefined) {
        console.log(results[0]);
        let hashPassword = bcrypt.hashSync(req.body.password, salt);
        connection.query(
          "INSERT INTO `users` (`id_users`, `login`, `password`, `firstname`, `surname`, `organization`, `role`) VALUES (NULL, ?, ?, ?, ?, ?, ?)",
          [
            req.body.login,
            hashPassword,
            req.body.name,
            req.body.surname,
            req.body.organization,
            req.body.role,
          ],
          function (err, r) {
            console.log("БД результаты:");
            if (err) {
              console.log("Ошибка записи в БД!");
              console.warn(err);
            } else {
              console.log(r);
              try {
                connection.query(
                  `SELECT * FROM users WHERE login = ? `,
                  [req.body.login],
                  function (err, results) {
                    if (err) {
                      res
                        .status(500)
                        .send(
                          "Ошибка сервера при получении пользователя по логину"
                        );
                      console.log(err);
                    }
                    console.log(
                      "Результаты проверки существования пользователя:"
                    );
                    if (results !== undefined) {
                      console.log(results[0]);
                      if (results[0] === undefined) {
                        res.send({
                          error: "401",
                          message: "Неправильный логин или пароль",
                          token: null,
                        });
                      } else {
                        console.log(results[0]);
                        let token = jwt.sign({
                            id_users: results[0].id_users,
                            firstname: results[0].firstname,
                            surname: results[0].surname,
                            organization: results[0].organization,
                            role: results[0].role,
                          },
                          CONFIG.SECRET, {
                            expiresIn: 86400, // токен на 24 часа
                          }
                        );
                        res.send({
                          token,
                        });
                      }
                    }
                  }
                );
              } catch (error) {}
              // res.json("not exist");
            }
          }
        );
      } else {
        res.json("exist");
      }
    }
  );
});

// Попытка входа пользователя
app.post("/api/login", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для входа:");
  console.log(req.body);
  connection.query(
    `SELECT * FROM users WHERE (login="${req.body.login}")`,
    function (err, results) {
      if (err) {
        res
          .status(500)
          .send("Ошибка сервера при получении пользователя по логину");
        console.log(err);
      }
      console.log("Результаты проверки существования пользователя:");
      if (results !== undefined) {
        console.log(results[0]);
        if (results[0] === undefined) {
          res.send({
            error: "401",
            message: "Неправильный логин или пароль",
            token: null,
          });
        } else {
          console.log(results[0]);
          let bool = bcrypt.compareSync(req.body.password, results[0].password);
          if (bool) {
            let token = jwt.sign({
                id_users: results[0].id_users,
                firstname: results[0].firstname,
                surname: results[0].surname,
                organization: results[0].organization,
                role: results[0].role,
              },
              CONFIG.SECRET, {
                expiresIn: 86400, // токен на 24 часа
              }
            );
            res.send({
              token,
            });
          } else {
            res.send({
              error: "401",
              message: "Неправильный логин или пароль",
              token: null,
            });
          }
        }
      }
    }
  );
});

app.get("/api/courses", function (req, res) {
  try {
    connection.query("SELECT * FROM `courses`", function (
      error,
      results,
      fields
    ) {
      if (error) {
        res.status(500).send("Ошибка сервера при получении названия курса");
        console.log(error);
      }
      console.log("РЕЗУЛЬТАТЫ");
      console.log(results);
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
});

//comments
app.get("/api/comments", function (req, res) {
  try {
    connection.query("SELECT * FROM `Comments`", function (
      error,
      results,
      fields
    ) {
      if (error) {
        res.status(500).send("Ошибка сервера при получении комментариев");
        console.log(error);
      }
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/comments", (req, res) => {
  // res.sendFile(__dirname, "../dist/index.html");
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для комментариев:");
  console.log(req.body);
  connection.query(
    "INSERT INTO `Comments` (`id_comment`, `name_commentator`, `date_comment`, `text_comment`, `id_materials`) VALUES (NULL, ?, ?, ?, ?);",
    [
      req.body.name_commentator,
      req.body.date_comment,
      JSON.stringify(req.body.text_comment),
      req.body.id_materials,
    ],
    function (err, results) {
      console.log("БД результаты:");
      if (err) {
        console.log("Ошибка записи в БД!");
        console.warn(err);
      } else {
        console.log(results);
      }
    }
  );
});
// app.put('/api/comments/:id', function (req, res) {
//   console.log('PUT /', );
//   console.log(req.body);
//   console.log(req.body.duration, req.body.content.time, req.body.title, JSON.stringify(req.body.content.blocks), req.params.id);
//   try {
//     connection.query('UPDATE `Comments` SET `duration` = ?, `date` = ?, `title` = ?, `content` = ? WHERE id_materials = ?',
//       [req.body.duration, req.body.content.time, req.body.title, JSON.stringify(req.body.content.blocks), req.params.id],
//       function (error, results, fields) {
//         if (error) {
//           res.status(500).send('Ошибка сервера при получении названия курса')
//           console.log(error);
//         }
//         console.log('РЕЗУЛЬТАТЫ');
//         console.log(results);
//         res.json(results);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// });

app.delete("/api/comments", function (req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл delete запрос для комментариев:");
  console.log(req.body);
  connection.query(
    "DELETE FROM `Comments` WHERE `id_comment`= ?",
    [req.body.id_comment],
    function (err, results) {
      console.log("БД результаты:");
      if (err) {
        console.log("Ошибка записи в БД!");
        console.warn(err);
      } else {
        console.log(results);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Сервер запущен на http://localhost:3001");
});
