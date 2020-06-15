"use strict";
const express = require("express");
const serveStatic = require("serve-static");
const bodyParser = require("body-parser");
// const mysql = require("mysql2");
const path = require("path");
const dbConfig = require("./db.config.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const CONFIG = require("./secret.config.js");
const morgan = require("morgan");
const compression = require("compression");
const Sequelize = require("sequelize");
const multer = require("multer");

const app = express();

// Путь папки для загрузки
let DIR = "./server/uploads";

// Определяем правила загрузки файлов на сервер
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Определяем тип
let upload = multer({
  storage: storage,
});

// Промежуточный обработчик для сжатия gzip
app.use(compression());

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
let sequelize;
if (process.env.PORT) {
  // Подключение к БД через Sequelize
  sequelize = new Sequelize(
    dbConfig.PROD.DB,
    dbConfig.PROD.USER,
    dbConfig.PROD.PASSWORD, {
      dialect: dbConfig.PROD.DIALECT,
      host: dbConfig.PROD.HOST,
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
    }
  );
} else {
  // Подключение к БД через Sequelize
  sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: dbConfig.DIALECT,
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
}

// Модель Comments
const Comments = sequelize.define(
  "comments", {
    id_comment: {
      type: Sequelize.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    date_comment: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    text_comment: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    id_materials: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    author_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
  }, {
    timestamps: false,
  }
);

// Модель Materials
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
    main_image: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    charset: "UTF8",
    collate: "utf8_unicode_ci",
  }
);

// Модель Users
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
    is_admin: {
      type: Sequelize.BOOLEAN
    }
  }, {
    charset: "UTF8",
    collate: "utf8_unicode_ci",
  }
);

// Модель UsersHasMaterials
const UsersHasMaterials = sequelize.define("users_has_materials", {
  //   // id_users_has_materials: {
  //   //   type: Sequelize.INTEGER,
  //   //   primaryKey: true,
  //   //   autoIncrement: true,
  //   //   allowNull: false
  //   // },
  //   id_users: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //   },
  //   id_materials: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //   },
  status: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
}, {
  charset: "UTF8",
  collate: "utf8_unicode_ci",
})

// Реляции таблиц
Users.belongsToMany(Materials, {
  through: 'users_has_materials',
  foreignKey: 'id_users',
  otherKey: 'id_materials',
  as: 'materials'
});
Materials.belongsToMany(Users, {
  through: 'users_has_materials',
  foreignKey: 'id_materials',
  otherKey: 'id_users',
  as: 'users'
});
Materials.hasMany(Comments, {
  onDelete: "cascade",
  foreignKey: "id_materials",
  as: "Comments",
});
Comments.belongsTo(Materials, {
  foreignKey: "id_materials",
  as: "material",
});
Users.hasMany(Comments, {
  onDelete: "cascade",
  foreignKey: "author_id",
  as: "comments",
});
Comments.belongsTo(Users, {
  foreignKey: "author_id",
  as: "user",
});

// Синхронизация Sequelize с удалённой БД
sequelize
  // .sync()
  // Вариант для изменений в таблицах
  .sync({
    alter: true,
    // force: process.env.PORT !== null
  })
  .then((result) => {
    console.log("[Sequelize] Всё ОК");
  })
  .catch((err) => console.log(err));
sequelize.afterConnect((connect) => {
  connect.query("SET NAMES UTF8", (res) => {
    console.log("Set names", res);
  });
});

let salt = bcrypt.genSaltSync(10);

//***********************************/
//*** Ниже пишется только API!!!! ***/
//***********************************/

// При получении любого пути возвращать index.html из папки dist
// app.get(/.*/, function (req, res) {
//   res.sendFile(path.join(__dirname, "../dist/index.html"));
// });
//
// При корневом пути возвращать index.html из папки dist
app.all("/admin", (req, res) => {
  res.sendFile("index.html", {
    root: __dirname + "/../dist/medtech/",
  });
});
app.all("/admin/*", (req, res) => {
  res.sendFile("index.html", {
    root: __dirname + "/../dist/medtech/",
  });
});
app.all("/news", (req, res) => {
  res.sendFile("index.html", {
    root: __dirname + "/../dist/medtech/",
  });
});

// app.all("/*", function (req, res, next) {
//   // Just send the index.html for other files to support HTML5Mode
//   res.sendFile("index.html", { root: __dirname + "/../dist/medtech/" });
// });

// Получение избранных записей
app.post("/api/favourite-materials/:id_materials", async (req, res) => {
  try {
    let decode = await jwt.decode(req.headers.authorization)
    console.log(decode);
    if (decode) {
      let result = await UsersHasMaterials.create({
        id_materials: req.params.id_materials,
        id_users: decode.id_users
      })
      res.send(result)
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: error
    })
  }
})

// Получение избранных записей
app.get("/api/favourite-materials", async (req, res) => {
  try {
    let decode = await jwt.decode(req.headers.authorization)
    console.log(decode);
    if (decode) {
      let result = await Users.findAll({
        where: {
          id_users: decode.id_users
        },
        attributes: ['id_users'],
        include: [{
          model: Materials,
          as: "materials",
        }, ]
      })
      res.send(result)
    } else {
      res.status(401).send({
        status: 401,
        message: 'Ошибка расшифровки токена!'
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: error
    })
  }
})

// Получение списка всех пользователей
app.get("/api/users/all", async (req, res) => {
  let result = await Users.findAll({
    attributes: ['id_users', 'login', 'firstname', 'surname', 'createdAt', 'is_admin'],
    order: [
      ['createdAt', 'DESC'],
      ['id_users', 'DESC'],
    ],
  });
  res.status(200).send(result);
})

// Изменение прав администратора пользователя
app.put("/api/users/setadmin/:id", async (req, res) => {
  let result = await Users.update({
    is_admin: req.body.is_admin
  }, {
    where: {
      id_users: req.params.id
    }
  });
  res.status(200).send(result);
})

// Удаление конкретного пользователя
app.delete("/api/users/:id", async (req, res) => {
  let result = await Users.destroy({
    where: {
      id_users: req.params.id
    }
  });
  res.status(200).send(result);
})

// Удаление конкретного комментария
app.delete("/api/comments/:id", async (req, res) => {
  let result = await Comments.destroy({
    where: {
      id_comment: req.params.id
    }
  });
  res.status(200).send({
    status: 200,
    message: 'OK'
  })
})

// Получение списка всех комментариев
app.get("/api/comments/all", async (req, res) => {
  let comments = await Comments.findAll({
    order: [
      ['date_comment', 'DESC'],
    ],
    include: [{
      model: Materials,
      as: 'material',
      attributes: ['id_materials', 'title']
    }]
  });
  setTimeout(() => {
    res.send(comments);
  }, 300);
})

// Отправка фото
app.get("/api/uploads/:filename", (req, res) => {
  if (req.params.filename) {
    res.sendFile(path.join(__dirname, 'uploads', req.params.filename), function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).send({
          status: err.status
        });
      } else {
        console.log('Sent:', req.params.filename);
      }
    })
  } else {
    res.status(400).send({
      status: 400
    });
  }

})

// Загрузка фото
app.post("/api/posts/photos", upload.single("image"), async (req, res) => {
  if (!req.file) {
    console.log("Нет доступного файла");
    return res.send({
      success: false,
    });
  } else {
    console.log("Файл доступен!");
    return res.send({
      success: true,
      filename: req.file.filename
    });
  }
});

/******************************************************************** */
/** CRUD для новостных постов */

// Создание новостного поста
app.post("/api/posts", async (req, res) => {
  console.log('TOKEN DECODE', jwt.decode(req.headers.authorization));
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для постов:");
  console.log(req.body);
  let result;
  try {
    let decoded = await jwt.decode(req.headers.authorization)
    result = await Materials.create({
      duration: req.body.duration,
      date: req.body.content.time,
      type: "news",
      title: req.body.title,
      content: JSON.stringify(req.body.content.blocks),
      main_image: req.body.main_image,
      author: decoded.firstname + ' ' + decoded.surname
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Ошибка сервера: " + error,
    });
  }
});

// Получение списка новостных постов
app.get("/api/posts", async (req, res) => {
  console.log("AUTHORIZATION: ", req.headers.authorization);
  let result;
  try {
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
      message: "Ошибка сервера: " + error,
    });
  }
});

// Получение конкретного поста
app.get("/api/posts/:id", async (req, res) => {
  console.log(req.params.id);
  let result;
  try {
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
    result = await Materials.update({
      duration: req.body.duration,
      date: req.body.content.time,
      title: req.body.title,
      content: JSON.stringify(req.body.content.blocks),
      main_image: req.body.main_image
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
            is_admin: user.is_admin
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
      res.send("exist");
      // res.status(404).send({
      //   status: 404,
      //   message: "Неправильный логин или пароль",
      // });
    } else {
      let passwordCompare = await bcrypt.compare(
        req.body.password,
        existUser.password
      );
      if (!passwordCompare) {
        res.send("exist");
        // res.status(404).send({
        //   status: 404,
        //   message: "Неправильный логин или пароль",
        // });
      } else {
        jwt.sign({
            id_users: existUser.id_users,
            firstname: existUser.firstname,
            surname: existUser.surname,
            organization: existUser.organization,
            role: existUser.role,
            is_admin: existUser.is_admin
          },
          CONFIG.SECRET, {
            expiresIn: 86400, // токен на 24 часа
          },
          (err, token) => {
            if (err) {
              res.status(500).send({
                status: 500,
                message: "Ошибка сервера",
              });
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
});

// Получение комментариев
app.get("/api/comments/:id", async (req, res) => {
  try {
    let comments = await Comments.findAll({
      where: {
        id_materials: req.params.id,
      },
      include: [{
        association: "user",
        attributes: ["firstname", "surname"],
      }, ],
    });
    res.send(comments);
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Ошибка сервера при получении комментариев",
    });
    console.log(error);
  }
});

app.post("/api/comments", async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для комментариев:");
  console.log(req.body);
  try {
    let create = Comments.create({
      text_comment: req.body.text_comment,
      id_materials: req.body.id_materials,
      author_id: req.body.author_id,
    });
    res.send(create);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Ошибка сервера при создании комментария",
    });
  }
});

// TODO: написать обработку PUT запроса для комментариев при необходимости
// app.put('/api/comments/:id', function (req, res) {
// });

app.delete("/api/comments/:id", async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл delete запрос для комментариев:");
  console.log(req.body);
  try {
    let destroy = await Comments.destroy({
      where: {
        id_comment: req.params.id,
      },
    });
    res.send({
      status: 200,
      message: `Комментарий #${req.params.id} удалён`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Ошибка сервера при удалении комментария",
    });
  }
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

// Прослушка порта веб-сервера
app.listen(process.env.PORT || 3001, () => {
  console.log(`Сервер запущен на http://localhost:${process.env.PORT || 3001}`);
});
