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
      password: req.body.password,
      mail: req.body.mail,
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
      registerYearId: req.body.registerYearId,
      studentStatusId: req.body.studentStatusId,
      acceptedTypeId: req.body.acceptedTypeId,
   });

   Student.create(student, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findBySearch = (req, res) => {
   let filtered = {};

   if (req.query.sectionId) {
      filtered.sectionId = req.query.sectionId * 1;
   }
   if (req.query.registerYearId) {
      filtered.registerYearId = req.query.registerYearId * 1;
   }

   if (req.query.studentStatusId) {
      filtered.studentStatusId = req.query.studentStatusId * 1;
   }

   if (req.query.acceptedTypeId) {
      filtered.acceptedTypeId = req.query.acceptedTypeId * 1;
   }

   if (req.query.studentLevel) {
      filtered.studentLevel = req.query.studentLevel * 1;
   }

   if (req.query.studyType) {
      filtered.studyType = req.query.studyType == 1 ? true : false;
   }

   Student.getBySearch(filtered, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
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
