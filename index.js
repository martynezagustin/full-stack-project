//imports
const express = require("express");
const path = require("path");
const { PrismaClient } = require("prisma/prisma-client");
const bodyParser = require("body-parser");
const engine = require("express-edge");
const session = require("express-session");
const flash = require("connect-flash");

//imports Routers

const { coursesRouter } = require("./router/courses");
const { mainRouter } = require("./router/index");
//create app
const app = express();

//Settings
const port = 8080;
const client = new PrismaClient();

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);

app.set("views", path.join(__dirname, "views"));

app.use(engine);

//Middlewares
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`
  new request: 
  TO: ${req.path}
  METHOD: ${req.method}
  `);
  next();
});

app.get("/lutsi", async (req, res) => {
  const courses = await req.client.course.findMany();
  res.json(courses);
});

app.use((req, res, next) => {
  req.client = client;
  next();
});

app.use(
  session({
    secret: "mysecretkey",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(flash());

//Routes
app.use(coursesRouter);
app.use(mainRouter);

app.get("/about", (req, res) => {
  res.render("index", {
    archivo: "SI PINTA HAY TIJERA",
  });
});
app.listen(port, () => {
  console.log("Escuchando en puerto " + port);
});
