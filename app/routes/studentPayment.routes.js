module.exports = (app) => {
   const studentPayment = require("../controllers/studentPayment.controllers.js");

   app.post("/api/addStudentPayment", studentPayment.create);

   app.get("/api/studentPayments", studentPayment.findAll);

   app.get("/api/studentPayment/:id", studentPayment.findOne);

   app.put("/api/studentPayment/:id", studentPayment.update);

   app.delete("/api/studentPayment/:id", studentPayment.delete);

   app.delete("/api/studentPayments", studentPayment.deleteAll);
};
