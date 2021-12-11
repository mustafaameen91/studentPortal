const SectionCost = require("../models/sectionCost.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const sectionCost = new SectionCost({
      sectionId: req.body.sectionId,
      cost: req.body.cost,
      attempts: req.body.attempts,
   });

   SectionCost.create(sectionCost, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   SectionCost.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   SectionCost.findById(req.params.id, (err, data) => {
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

   SectionCost.updateById(
      req.params.id,
      new SectionCost(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   SectionCost.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Pass Type was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   SectionCost.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Pass Types were deleted successfully!` });
   });
};
