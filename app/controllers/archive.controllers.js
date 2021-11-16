const Archive = require("../models/archive.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const archive = new Archive({
      from: req.body.from,
      to: req.body.to,
      archiveDate: req.body.archiveDate,
      archiveSubjectId: req.body.archiveSubjectId,
      archiveNumber: req.body.archiveNumber,
      subjectDescription: req.body.subjectDescription,
      note: req.body.note,
      sectionId: req.body.sectionId,
   });

   Archive.create(archive, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   Archive.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Archive.findById(req.params.id, (err, data) => {
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

   Archive.updateById(req.params.id, new Archive(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   Archive.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Archive was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Archive.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Archives were deleted successfully!` });
   });
};
