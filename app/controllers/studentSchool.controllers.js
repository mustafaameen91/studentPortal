const StudentSchool = require("../models/studentSchool.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const studentSchool = new StudentSchool({
      schoolName: req.body.schoolName,
      graduationDate: req.body.graduationDate,
      documentDate: req.body.documentDate,
      totalMarks: req.body.totalMarks * 1,
      average: req.body.average * 1,
      documentNumber: req.body.documentNumber * 1,
      documentDate: req.body.documentDate,
      lessonCount: req.body.lessonCount * 1,
      Directorate: req.body.Directorate,
      studySubCategoryId: req.body.studySubCategoryId,
      studentId: req.body.studentId,
      certificateStatusId: req.body.certificateStatusId,
      certificateStatusDescription: req.body.certificateStatusDescription,
   });

   StudentSchool.create(studentSchool, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   StudentSchool.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   StudentSchool.findById(req.params.id, (err, data) => {
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

   StudentSchool.updateById(
      req.params.id,
      new StudentSchool(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   StudentSchool.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `StudentSchool was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   StudentSchool.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({ message: `All StudentSchools were deleted successfully!` });
   });
};
