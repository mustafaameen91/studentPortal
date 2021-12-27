module.exports = (app) => {
   const payType = require("../controllers/payType.controllers.js");

   app.post("/api/addPayType", payType.create);

   app.get("/api/payTypes", payType.findAll);

   app.get("/api/payType/:id", payType.findOne);

   app.put("/api/payType/:id", payType.update);

   app.delete("/api/payType/:id", payType.delete);

   app.delete("/api/payTypes", payType.deleteAll);
};
