const StudentPayment = require("../models/studentPayment.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const studentPayment = new StudentPayment({
      studentId: req.body.studentId,
      discountId: req.body.discountId,
      level: req.body.level,
   });

   StudentPayment.create(studentPayment, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   StudentPayment.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   StudentPayment.findById(req.params.id, (err, data) => {
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

   StudentPayment.updateById(
      req.params.id,
      new StudentPayment(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   StudentPayment.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Pass Type was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   StudentPayment.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Pass Types were deleted successfully!` });
   });
};
