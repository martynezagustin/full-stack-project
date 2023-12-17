//imports
const express = require("express");
const path = require("path");
const { PrismaClient } = require("prisma/prisma-client");
const engine = require("express-edge");

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

app.use((req, res, next) => {
  console.log(`
  new request: 
  TO: ${req.path}
  METHOD: ${req.method}
  `);
  next();
});

app.get("/lutsi", async (req, res) => {
  const courses = await client.course.findMany();
  res.json(courses);
});

app.use((req, res, next) => {
  req.client = client;
  next();
});

//Routes
app.get("/", async (req, res) => {
  const cursos = await req.client.course.findMany();
  const colors = {
    begginer: "blue",
    intermediate: "green",
    advanced: "purple",
  };
  const coursesWithColors = cursos.map((c) => {
    return {
      ...c,
      color: colors[c.level],
    };
  });
  console.log(cursos);
  res.render("index", {
    cursos: coursesWithColors
  });
});

app.get("/about", (req, res) => {
  res.render("index", {
    archivo: "SI PINTA HAY TIJERA",
  });
});

app.listen(port, () => {
  console.log("Escuchando en puerto " + port);
});
