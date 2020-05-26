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

/**************** ТЕСТОВЫЙ ФРАГМЕНТ ********************** */
const Sequelize = require("sequelize");

// Подключение к Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  dialect: "mysql",
  host: dbConfig.HOST,
  define: {
    dialectOptions: {
      charset: "UTF8",
      collate: "utf8_unicode_ci",
    },
    timestamps: true,
  },
  pool: {
    max: 10,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
  isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
});

const Materials = sequelize.define(
  "materials", {
    id_materials: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    duration: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  }, {
    charset: "UTF8",
    collate: "utf8_unicode_ci",
  }
);

const Users = sequelize.define(
  "users", {
    id_users: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    surname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    organization: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    charset: "UTF8",
    collate: "utf8_unicode_ci",
  }
);
// Синхронизация Sequelize с удалённой БД
sequelize
  .sync()
  .then((result) => {
    console.log("[Sequelize] Всё ОК");
  })
  .catch((err) => console.log(err));
sequelize.afterConnect((connect) => {
  // sequelize.query('SHOW VARIABLES LIKE "character%"').then((result) => {
  //   console.log(result);
  // });
  connect.query("SET NAMES UTF8", (res) => {
    console.log("Set names", res);
  });
  // sequelize.query('SHOW VARIABLES LIKE "character%"').then((result) => {
  //   console.log("AFTER", result);
  // });
});
/**************** ТЕСТОВЫЙ ФРАГМЕНТ ********************** */

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
app.post("/api/posts", async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для постов:");
  console.log(req.body);
  // //***************** Вариант транзакции с библиотекой mysql2  ********************************
  // connection.query("START TRANSACTION", () => {
  //   console.log("НАЧАЛАСЬ ТРАНЗАКЦИЯ POST");
  //   connection.query(
  //     'INSERT INTO `materials` (`duration`, `date`, `type`, `title`, `content`) VALUES (?, ?, "news", ?, ?)',
  //     [
  //       req.body.duration,
  //       req.body.content.time,
  //       req.body.title,
  //       JSON.stringify(req.body.content.blocks),
  //     ],
  //     function (err, results) {
  //       console.log("БД результаты:");
  //       if (err) {
  //         console.log("Ошибка записи в БД!");
  //         console.warn(err);
  //       } else {
  //         console.log(results);
  //       }
  //       connection.query("COMMIT", () => {
  //         console.log("ЗАВЕРШЕНИЕ ТРАНЗАКЦИИ POST");
  //       });
  //     }
  //   );
  // });
  // //***************** Вариант транзакции с библиотекой mysql2  ********************************
  let result;
  try {
    result = await Materials.create({
      duration: req.body.duration,
      date: req.body.content.time,
      type: "news",
      title: req.body.title,
      content: JSON.stringify(req.body.content.blocks),
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Ошибка сервера",
    });
  }
  // sequelize.query('SET NAMES "utf8"');
  // sequelize.query('SET CHARACTER SET "utf8"');
  // sequelize.query('SET SESSION collation_connection = "utf8_unicode_ci"');
  // Materials.create({
  //   duration: "тест",
  //   date: "тест",
  //   type: "news",
  //   title: "тест",
  //   content: "тест",
  // })
  //   .then((result) => {
  //     Materials.create({
  //       duration: "тест2",
  //       date: "тест2",
  //       type: "news2",
  //       title: "тест2",
  //       content: "тест2",
  //     })
  //       .then((result) => {
  //         res.send(result);
  //         Materials.findByPk(result.dataValues.id_materials).then((ress) => {
  //           console.log(detect(ress.dataValues.title));
  //         });
  //         console.log("RESULTAT: ", result);
  //       })
  //       .catch((err) => console.log(err));
  //   })
  //   .catch((err) => console.log(err));
});

// Получение списка новостных постов
app.get("/api/posts", async (req, res) => {
  console.log("AUTHORIZATION: ", req.headers.authorization);
  let result;
  try {
    // connection.query("SELECT * FROM `materials`", function (
    //   error,
    //   results,
    //   fields
    // ) {
    //   if (error) {
    //     res.status(500).send("Ошибка сервера при получении постов");
    //     console.log(error);
    //   }
    //   res.json(results);
    // });
    result = await Materials.findAll();
    if (await !result) {
      res.status(500).send({
        status: 500,
        message: "Ошибка получения постов",
      });
    } else {
      res.send(result);
    }
    console.log(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Ошибка сервера",
    });
  }
});

// Получение конкретного поста
app.get("/api/posts/:id", async (req, res) => {
  console.log(req.params.id);
  let result;
  try {
    // connection.query(
    //   "SELECT * FROM `materials` WHERE id_materials = ?",
    //   [req.params.id],
    //   function (error, results, fields) {
    //     if (error) {
    //       res.status(500).send("Ошибка сервера при получении постов");
    //       console.log(error);
    //     }
    //     console.log("РЕЗУЛЬТАТЫ");
    //     console.log(results);
    //     res.json(results);
    //   }
    // );
    result = await Materials.findAll({
      where: {
        id_materials: req.params.id,
      },
    });
    if (!result) {
      res.status(404).send({
        status: 404,
        message: "Пост не найден",
      });
    } else {
      res.send(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Ошибка сервера",
    });
  }
});

// Редактирование конкретного поста
app.put("/api/posts/:id", async (req, res) => {
  console.log("PUT /");
  console.log(req.body);
  let result;
  try {
    // connection.query("START TRANSACTION", () => {
    //   console.log("НАЧАЛАСЬ ТРАНЗАКЦИЯ PUT");
    //   console.log(
    //     req.body.duration,
    //     req.body.content.time,
    //     req.body.title,
    //     JSON.stringify(req.body.content.blocks),
    //     req.params.id
    //   );
    //   connection.query(
    //     "UPDATE `materials` SET `duration` = ?, `date` = ?, `title` = ?, `content` = ? WHERE id_materials = ?",
    //     [
    //       req.body.duration,
    //       req.body.content.time,
    //       req.body.title,
    //       JSON.stringify(req.body.content.blocks),
    //       req.params.id,
    //     ],
    //     function (error, results, fields) {
    //       if (error) {
    //         res.status(500).send("Ошибка сервера при получении названия курса");
    //         console.log(error);
    //       }
    //       console.log("РЕЗУЛЬТАТЫ");
    //       console.log(results);
    //       connection.query("COMMIT", () => {
    //         res.json(results);
    //         console.log("ЗАВЕРШЕНА ТРАНЗАКЦИЯ PUT");
    //       });
    //     }
    //   );
    // });
    result = await Materials.update({
      duration: req.body.duration,
      date: req.body.content.time,
      title: req.body.title,
      content: JSON.stringify(req.body.content.blocks),
    }, {
      where: {
        id_materials: req.params.id,
      },
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Ошибка сервера",
    });
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  let result;
  try {
    // connection.query("START TRANSACTION", () => {
    //   console.log("НАЧАЛАСЬ ТРАНЗАКЦИЯ DELETE");
    //   connection.query(
    //     "DELETE FROM `materials` WHERE id_materials = ?",
    //     [req.params.id],
    //     function (error, results, fields) {
    //       if (error) {
    //         res.status(500).send("Ошибка сервера при получении названия курса");
    //         console.log(error);
    //       } else {
    //         res.send({
    //           message: `Удалена запись с ID ${req.params.id}`,
    //         });
    //       }
    //       connection.query("COMMIT", () => {
    //         console.log("ЗАВЕРШЕНА ТРАНЗАКЦИЯ DELETE");
    //       });
    //     }
    //   );
    // });
    result = await Materials.destroy({
      where: {
        id_materials: req.params.id,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "Ошибка сервера",
    });
    console.log(err);
  }
});
/******************************************************************** */

// Регистрация пользователя
app.post("/api/users", async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для пользователей:");
  console.log(req.body);
  let existUser;
  let result;
  let user;
  try {
    existUser = await Users.findOne({
      where: {
        login: req.body.login,
      },
    });
    if (!existUser) {
      bcrypt.hash(req.body.password, salt, async (err, encrypted) => {
        if (err) {
          console.log(err);
          res.status(500).send({
            status: 500,
            message: "Ошибка криптографии пароля",
          });
        }
        result = await Users.create({
          login: req.body.login,
          password: encrypted,
          firstname: req.body.name,
          surname: req.body.surname,
          organization: req.body.organization,
          role: req.body.role,
        });
        user = await Users.findOne({
          where: {
            login: req.body.login,
          },
        });
        console.log("Созданный пользователь: ", user);
        let token = await jwt.sign({
            id_users: user.id_users,
            firstname: user.firstname,
            surname: user.surname,
            organization: user.organization,
            role: user.role,
          },
          CONFIG.SECRET, {
            expiresIn: 86400, // токен на 24 часа
          }
        );
        res.send({
          token,
        });
      });
    } else {
      // res.status(400).send({
      //   status: 400,
      //   message: "Пользователь с таким логином существует!",
      // });
      res.json("exist");
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Ошибка сервера",
    });
  }
  // connection.query(
  //   `SELECT * FROM users WHERE login='${req.body.login}'`,
  //   function (error, results) {
  //     if (error) {
  //       res
  //         .status(500)
  //         .send(
  //           "Ошибка сервера при получении пользователей с таким же логином"
  //         );
  //       console.log(error);
  //     }
  //     console.log("Результаты проверки существования логина:");
  //     console.log(results);
  //     if (results[0] === undefined) {
  //       console.log(results[0]);
  //       let hashPassword = bcrypt.hashSync(req.body.password, salt);
  //       connection.query(
  //         "INSERT INTO `users` (`id_users`, `login`, `password`, `firstname`, `surname`, `organization`, `role`) VALUES (NULL, ?, ?, ?, ?, ?, ?)",
  //         [
  //           req.body.login,
  //           hashPassword,
  //           req.body.name,
  //           req.body.surname,
  //           req.body.organization,
  //           req.body.role,
  //         ],
  //         function (err, r) {
  //           console.log("БД результаты:");
  //           if (err) {
  //             console.log("Ошибка записи в БД!");
  //             console.warn(err);
  //           } else {
  //             console.log(r);
  //             try {
  //               connection.query(
  //                 `SELECT * FROM users WHERE login = ? `,
  //                 [req.body.login],
  //                 function (err, results) {
  //                   if (err) {
  //                     res
  //                       .status(500)
  //                       .send(
  //                         "Ошибка сервера при получении пользователя по логину"
  //                       );
  //                     console.log(err);
  //                   }
  //                   console.log(
  //                     "Результаты проверки существования пользователя:"
  //                   );
  //                   if (results !== undefined) {
  //                     console.log(results[0]);
  //                     if (results[0] === undefined) {
  //                       res.send({
  //                         error: "401",
  //                         message: "Неправильный логин или пароль",
  //                         token: null,
  //                       });
  //                     } else {
  //                       console.log(results[0]);
  //                       let token = jwt.sign(
  //                         {
  //                           id_users: results[0].id_users,
  //                           firstname: results[0].firstname,
  //                           surname: results[0].surname,
  //                           organization: results[0].organization,
  //                           role: results[0].role,
  //                         },
  //                         CONFIG.SECRET,
  //                         {
  //                           expiresIn: 86400, // токен на 24 часа
  //                         }
  //                       );
  //                       res.send({
  //                         token,
  //                       });
  //                     }
  //                   }
  //                 }
  //               );
  //             } catch (error) {}
  //             // res.json("not exist");
  //           }
  //         }
  //       );
  //     } else {
  //       res.json("exist");
  //     }
  //   }
  // );
});

// Попытка входа пользователя
app.post("/api/login", async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  try {
    let existUser = await Users.findOne({
      where: {
        login: req.body.login,
      },
    });
    if (!existUser) {
      res.status(404).send({
        status: 404,
        message: "Неправильный логин или пароль",
      });
    } else {
      let passwordCompare = await bcrypt.compare(
        req.body.password,
        existUser.password
      );
      if (!passwordCompare) {
        res.status(404).send({
          status: 404,
          message: "Неправильный логин или пароль",
        });
      } else {
        jwt.sign({
            id_users: existUser.id_users,
            firstname: existUser.firstname,
            surname: existUser.surname,
            organization: existUser.organization,
            role: existUser.role,
          },
          CONFIG.SECRET, {
            expiresIn: 86400, // токен на 24 часа
          },
          (err, token) => {
            if (err) {
              res.status(500).send({
                status: 500,
                message: "Ошибка сервера"
              })
            } else {
              res.send({
                token,
              });
            }
          }
        );
      }
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Ошибка сервера",
    });
  }

  // console.log("Пришёл POST запрос для входа:");
  // console.log(req.body);
  // connection.query(
  //   `SELECT * FROM users WHERE (login="${req.body.login}")`,
  //   function (err, results) {
  //     if (err) {
  //       res
  //         .status(500)
  //         .send("Ошибка сервера при получении пользователя по логину");
  //       console.log(err);
  //     }
  //     console.log("Результаты проверки существования пользователя:");
  //     if (results !== undefined) {
  //       console.log(results[0]);
  //       if (results[0] === undefined) {
  //         res.send({
  //           error: "401",
  //           message: "Неправильный логин или пароль",
  //           token: null,
  //         });
  //       } else {
  //         console.log(results[0]);
  //         let bool = bcrypt.compareSync(req.body.password, results[0].password);
  //         if (bool) {
  //           let token = jwt.sign({
  //               id_users: results[0].id_users,
  //               firstname: results[0].firstname,
  //               surname: results[0].surname,
  //               organization: results[0].organization,
  //               role: results[0].role,
  //             },
  //             CONFIG.SECRET, {
  //               expiresIn: 86400, // токен на 24 часа
  //             }
  //           );
  //           res.send({
  //             token,
  //           });
  //         } else {
  //           res.send({
  //             error: "401",
  //             message: "Неправильный логин или пароль",
  //             token: null,
  //           });
  //         }
  //       }
  //     }
  //   }
  // );
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
app.get("/api/comments/:id", function (req, res) {
  try {
    connection.query(
      "SELECT * FROM `comments` WHERE id_materials=?",
      [req.params.id],
      function (error, results, fields) {
        if (error) {
          res.status(500).send("Ошибка сервера при получении комментариев");
          console.log(error);
        }
        res.json(results);
        console.log(results);
      }
    );
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
    "INSERT INTO `comments` (`id_comment`, `name_commentator`, `date_comment`, `text_comment`, `id_materials`) VALUES (NULL, ?, CURRENT_TIMESTAMP, ?, ?);",
    [req.body.name_commentator, req.body.text_comment, req.body.id_materials],
    function (err, results) {
      console.log("БД результаты:");
      if (err) {
        console.log("Ошибка записи в БД!");
        console.warn(err);
      } else {
        console.log(results);
        res.json(results);
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
    "DELETE FROM `comments` WHERE `id_comment`= ?",
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
app.post("/api/token_validate", (req, res) => {
  let token = req.body.recaptcha;
  const secretkey = "6Lcd5PMUAAAAADuWGBBEwGhouabjY-SSWRLB2kUv"; //the secret key from your google admin console;

  //token validation url is URL: https://www.google.com/recaptcha/api/siteverify
  // METHOD used is: POST

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}&remoteip=${req.connection.remoteAddress}`;

  //note that remoteip is the users ip address and it is optional
  // in node req.connection.remoteAddress gives the users ip address

  if (token === null || token === undefined) {
    res.status(201).send({
      success: false,
      message: "Token is empty or invalid",
    });
    return console.log("token empty");
  }

  request(url, function (err, response, body) {
    //the body is the data that contains success message
    body = JSON.parse(body);

    //check if the validation failed
    if (body.success !== undefined && !data.success) {
      res.send({
        success: false,
        message: "recaptcha failed",
      });
      return console.log("failed");
    }

    //if passed response success message to client
    res.send({
      success: true,
      message: "recaptcha passed",
    });
  });
});

app.listen(3001, () => {
  console.log("Сервер запущен на http://localhost:3001");
});
