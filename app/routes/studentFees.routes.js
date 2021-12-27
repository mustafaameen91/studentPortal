module.exports = (app) => {
   const studentFees = require("../controllers/studentFees.controllers.js");

   app.post("/api/addStudentFees", studentFees.create);

   app.get("/api/studentsFees", studentFees.findAll);

   app.get("/api/studentsFeesLast", studentFees.findLast);

   app.get("/api/studentsFeesForStudent/:id", studentFees.findByStudentId);

   app.get("/api/studentFees/:id", studentFees.findOne);

   app.put("/api/studentFees/:id", studentFees.update);

   app.delete("/api/studentFees/:id", studentFees.delete);

   app.delete("/api/studentsFees", studentFees.deleteAll);
};
