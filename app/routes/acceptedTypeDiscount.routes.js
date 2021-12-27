module.exports = (app) => {
   const acceptedTypeDiscount = require("../controllers/acceptedTypeDiscount.controllers.js");

   app.post("/api/addAcceptedTypeDiscount", acceptedTypeDiscount.create);

   app.get("/api/acceptedTypeDiscounts", acceptedTypeDiscount.findAll);

   app.get("/api/acceptedTypeDiscount/:id", acceptedTypeDiscount.findOne);

   app.put("/api/acceptedTypeDiscount/:id", acceptedTypeDiscount.update);

   app.delete("/api/acceptedTypeDiscount/:id", acceptedTypeDiscount.delete);

   app.delete("/api/acceptedTypeDiscounts", acceptedTypeDiscount.deleteAll);
};
