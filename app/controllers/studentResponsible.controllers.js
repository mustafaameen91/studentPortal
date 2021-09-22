const StudentResponsible = require("../models/studentResponsible.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const studentResponsible = new StudentResponsible({
      responsibleName: req.body.responsibleName,
      responsiblePhone: req.body.responsiblePhone,
      studentId: req.body.studentId,
   });

   StudentResponsible.create(studentResponsible, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   StudentResponsible.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   StudentResponsible.findById(req.params.id, (err, data) => {
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

   StudentResponsible.updateById(
      req.params.id,
      new StudentResponsible(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   StudentResponsible.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({ message: `StudentResponsible was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   StudentResponsible.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `All StudentResponsible were deleted successfully!`,
         });
   });
};
