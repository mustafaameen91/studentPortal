module.exports = (app) => {
   const administrativeOrder = require("../controllers/administrativeOrder.controllers.js");

   app.post("/api/addAdministrativeOrder", administrativeOrder.create);

   app.post("/api/addAdministrativeOrders", administrativeOrder.createMany);

   app.get("/api/administrativeOrders", administrativeOrder.findAll);

   app.get("/api/administrativeOrder/:id", administrativeOrder.findOne);

   app.put("/api/administrativeOrder/:id", administrativeOrder.update);

   app.delete("/api/administrativeOrder/:id", administrativeOrder.delete);

   app.delete("/api/administrativeOrders", administrativeOrder.deleteAll);
};
