const PayType = require("../models/payType.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const payType = new PayType({
      typeName: req.body.typeName,
   });

   PayType.create(payType, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   PayType.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   PayType.findById(req.params.id, (err, data) => {
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

   PayType.updateById(req.params.id, new PayType(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   PayType.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Pass Type was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   PayType.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Pass Types were deleted successfully!` });
   });
};
