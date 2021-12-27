module.exports = (app) => {
   const sectionCost = require("../controllers/sectionCost.controllers.js");

   app.post("/api/addSectionCost", sectionCost.create);

   app.get("/api/sectionCosts", sectionCost.findAll);

   app.get("/api/sectionCost/:id", sectionCost.findOne);

   app.get("/api/studentSectionCost", sectionCost.findOneBySectionAndLevel);

   app.put("/api/sectionCost/:id", sectionCost.update);

   app.delete("/api/sectionCost/:id", sectionCost.delete);

   app.delete("/api/sectionCosts", sectionCost.deleteAll);
};
