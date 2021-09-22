const Student = require("../models/student.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const student = new Student({
      studentName: req.body.studentName,
      englishName: req.body.englishName,
      mail: req.body.mail,
      password: req.body.password,
      dob: req.body.dob,
      sectionId: req.body.sectionId,
      nationality: req.body.nationality,
      phone: req.body.phone,
      gender: req.body.gender,
      studyType: req.body.studyType,
      relationships: req.body.relationships,
      note: req.body.note,
      religion: req.body.religion,
      motherName: req.body.motherName,
      collegeNumber: req.body.collegeNumber,
      enterYear: req.body.enterYear,
      studentStatusId: req.body.studentStatusId,
      acceptedTypeId: req.body.acceptedTypeId,
      addressId: req.body.addressId,
   });

   Student.create(student, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   Student.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Student.findById(req.params.id, (err, data) => {
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

   Student.updateById(req.params.id, new Student(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   Student.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Student was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Student.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Students were deleted successfully!` });
   });
};
