const StudentFees = require("../models/studentFees.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const studentFees = new StudentFees({
      feesPay: req.body.feesPay,
      payTypeId: req.body.payTypeId,
      payNote: req.body.payNote,
      createdBy: req.body.createdBy,
      checkNumber: req.body.checkNumber,
      studentPaymentId: req.body.studentPaymentId,
   });

   StudentFees.create(studentFees, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findLast = (req, res) => {
   StudentFees.getLast((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findByStudentId = (req, res) => {
   StudentFees.findByStudentId(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   StudentFees.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   StudentFees.findById(req.params.id, (err, data) => {
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

   StudentFees.updateById(
      req.params.id,
      new StudentFees(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   StudentFees.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Pass Type was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   StudentFees.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Pass Types were deleted successfully!` });
   });
};
