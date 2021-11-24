module.exports = (app) => {
   const administrativeOrder = require("../controllers/administrativeOrder.controllers.js");

   app.post("/api/addAdministrativeOrder", administrativeOrder.create);

   app.post("/api/addAdministrativeOrders", administrativeOrder.createMany);

   app.post("/api/addOrderLevels", administrativeOrder.createManyUpgrade);

   app.get("/api/administrativeOrders", administrativeOrder.findAll);

   app.get("/api/administrativeOrder/:id", administrativeOrder.findOne);

   app.get("/api/studentOrders/:id", administrativeOrder.findOneByStudentId);

   app.get("/api/searchOrder", administrativeOrder.findByFilter);

   app.put("/api/administrativeOrder/:id", administrativeOrder.update);

   app.put("/api/updateAdministrativeOrders", administrativeOrder.updateMany);

   app.delete("/api/administrativeOrder/:id", administrativeOrder.delete);

   app.delete("/api/administrativeOrders", administrativeOrder.deleteAll);

   app.delete(
      "/api/allAdministrativeOrders",
      administrativeOrder.deleteAllByOrderNumber
   );
};
