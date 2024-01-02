const { Router } = require("express");
const {mapCoursesWithColors} = require("../utils/mapCoursesWithColors")
const router = Router()

router.get("/", async (req, res) => {
    const cursos = await client.course.findMany();
    const coursesWithColors = mapCoursesWithColors(cursos)
    console.log(cursos);
    res.render("index", {
      cursos: coursesWithColors,
    });
  });
  

  module.exports = {mainRouter: router}