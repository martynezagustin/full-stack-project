const { Router } = require("express");
const { body, validationResult } = require("express-validator");

const router = Router();

router
  .route("/create")
  .get((req, res) => {
    const errors = req.flash("errors");
    res.render("create", {
      errors,
    });
  })
  .post(
    body("title").isLength({ min: 5, max: 200 }),
    body("description").isLength({ min: 20, max: 500 }),
    body("nivel").isIn(["begginer", "intermediate", "advanced"]),
    async (req, res) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        console.log(errors.array());
        req.flash("errors", ["Validation Failed"]);
        return res.redirect("/create");
      }

      try {
        console.log(req.body);
        const response = await req.client.course.create({
          data: req.body,
        });
        res.redirect("/");
      } catch (error) {
        if (error.code === "P2002") {
          console.log("Unique Failed");
          req.flash("errors", ["Course with that information already exists."]);
        }
        req.flash("errors", ["Creation Failed"]);
        res.redirect("/create");
      }
    }
  )

module.exports = { coursesRouter: router };
