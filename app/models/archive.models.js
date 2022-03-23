const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const Archive = function (archive) {
   this.from = archive.from;
   this.to = archive.to;
   this.archiveDate = archive.archiveDate;
   this.archiveSubjectId = archive.archiveSubjectId;
   this.archiveNumber = archive.archiveNumber;
   this.subjectDescription = archive.subjectDescription;
   this.note = archive.note;
   this.sectionId = archive.sectionId;
   this.archiveTypeId = archive.archiveTypeId;
   this.incomeNumber = archive.incomeNumber;
   this.incomeDate = archive.incomeDate;
   this.yearStudyId = archive.yearStudyId;
};

Archive.create = async (newArchive, result) => {
   try {
      const archive = await prismaInstance.archive.create({
         data: newArchive,
      });
      console.log(archive);
      result(null, archive);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Archive.findBySearch = async (search, result) => {
   try {
      const searchArchive = await prismaInstance.archive.findMany({
         where: {
            ...search,
         },
         include: {
            archiveSubject: true,
            ArchiveImage: true,
         },
      });

      if (searchArchive) {
         result(null, searchArchive);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Archive with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Archive.findById = async (archiveId, result) => {
   try {
      const singleArchive = await prismaInstance.archive.findUnique({
         where: {
            idArchive: JSON.parse(archiveId),
         },
      });

      if (singleArchive) {
         result(null, singleArchive);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Archive with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Archive.getAll = async (result) => {
   try {
      const archives = await prismaInstance.archive.findMany({
         include: {
            archiveSubject: true,
            archiveType: true,
            yearStudy: true,
         },
      });
      result(null, archives);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Archive.updateById = async (archiveId, archive, result) => {
   try {
      const updateArchive = await prismaInstance.archive.update({
         where: { idArchive: JSON.parse(archiveId) },
         data: archive,
      });
      result(null, updateArchive);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Archive.remove = async (id, result) => {
   try {
      const deleteArchive = await prismaInstance.archive.delete({
         where: { idArchive: JSON.parse(id) },
      });
      result(null, deleteArchive);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Archive.removeAll = async (result) => {
   try {
      const deleteAllArchives = await prismaInstance.archive.deleteMany({});
      result(null, deleteAllArchives);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = Archive;
