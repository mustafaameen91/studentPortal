const AdministrativeOrder = require("../models/administrativeOrder.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const administrativeOrder = new AdministrativeOrder({
      orderTitleId: req.body.orderTitleId,
      orderNumber: req.body.orderNumber,
      orderDescription: req.body.orderDescription,
      orderYear: req.body.orderYear,
      orderLevel: req.body.orderLevel,
      studentId: req.body.studentId,
      orderDate: req.body.orderDate,
      createdBy: req.body.createdBy,
   });

   AdministrativeOrder.create(administrativeOrder, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.createMany = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   AdministrativeOrder.createManyOrders(req.body, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   AdministrativeOrder.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   AdministrativeOrder.findById(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   AdministrativeOrder.updateById(
      req.params.id,
      new AdministrativeOrder(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   AdministrativeOrder.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `administrative Order was deleted successfully!`,
         });
   });
};

exports.deleteAll = (req, res) => {
   AdministrativeOrder.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `All administrative Orders were deleted successfully!`,
         });
   });
};
