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
      archiveDate: new Date(req.body.archiveDate),
      archiveSubjectId: req.body.archiveSubjectId * 1,
      archiveNumber: req.body.archiveNumber,
      subjectDescription: req.body.subjectDescription,
      note: req.body.note,
      sectionId: req.body.sectionId * 1,
      archiveTypeId: req.body.archiveTypeId * 1,
      incomeNumber: req.body.incomeNumber,
      incomeDate: req.body.incomeDate,
      yearStudyId: req.body.yearStudyId,
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

exports.searchArchive = (req, res) => {
   let search = {};

   if (req.query.numberSearch) {
      search.archiveNumber = req.query.numberSearch;
   }

   if (req.query.yearStudyId) {
      search.yearStudyId = req.query.yearStudyId * 1;
   }

   if (req.query.subjectSearch) {
      search.archiveSubjectId = req.query.subjectSearch * 1;
   }

   if (req.query.sectionId) {
      search.sectionId = req.query.sectionId * 1;
   }

   if (req.query.subjectDescription) {
      search.subjectDescription = {
         contains: req.query.subjectDescription,
      };
   }

   if (req.query.archiveTypeId) {
      search.archiveTypeId = req.query.archiveTypeId * 1;
   }

   if (req.query.dates) {
      if (req.query.dates.length > 0) {
         console.log(JSON.parse(req.query.dates));
         let date = JSON.parse(req.query.dates);
         var startDate = new Date(date[0]);
         var endDate = new Date(date[1]);

         search.archiveDate = {
            gte: startDate.toISOString(),
            lte: endDate.toISOString(),
         };
      }
   }

   Archive.findBySearch(search, (err, data) => {
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
