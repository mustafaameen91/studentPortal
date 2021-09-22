const User = require("../models/user.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const user = new User({
      userName: req.body.userName,
      password: req.body.password,
      roleId: req.body.roleId,
      sectionId: req.body.sectionId,
   });

   User.create(user, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   User.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   User.findById(req.params.id, (err, data) => {
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

   User.updateById(req.params.id, new User(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   User.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `User was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   User.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Users were deleted successfully!` });
   });
};
