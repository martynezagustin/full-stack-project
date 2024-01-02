function mapCoursesWithColors(cursos) {
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
  return coursesWithColors;
}

module.exports = {
    mapCoursesWithColors
}