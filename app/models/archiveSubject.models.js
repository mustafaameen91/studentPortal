const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const ArchiveSubject = function (archiveSubject) {
   this.subjectName = archiveSubject.subjectName;
};

ArchiveSubject.create = async (newArchiveSubject, result) => {
   try {
      const archiveSubject = await prismaInstance.archiveSubject.create({
         data: newArchiveSubject,
      });
      result(null, archiveSubject);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

ArchiveSubject.findById = async (archiveSubjectId, result) => {
   try {
      const singleArchiveSubject =
         await prismaInstance.archiveSubject.findUnique({
            where: {
               idArchiveSubject: JSON.parse(archiveSubjectId),
            },
         });

      if (singleArchiveSubject) {
         result(null, singleArchiveSubject);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Archive Subject with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

ArchiveSubject.getAll = async (result) => {
   try {
      const archiveSubjects = await prismaInstance.archiveSubject.findMany();
      result(null, archiveSubjects);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

ArchiveSubject.updateById = async (
   archiveSubjectId,
   archiveSubject,
   result
) => {
   try {
      const updateArchiveSubject = await prismaInstance.archiveSubject.update({
         where: { idArchiveSubject: JSON.parse(archiveSubjectId) },
         data: archiveSubject,
      });
      result(null, updateArchiveSubject);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

ArchiveSubject.remove = async (id, result) => {
   try {
      const deleteArchiveSubject = await prismaInstance.archiveSubject.delete({
         where: { idArchiveSubject: JSON.parse(id) },
      });
      result(null, deleteArchiveSubject);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

ArchiveSubject.removeAll = async (result) => {
   try {
      const deleteAllArchiveSubjects =
         await prismaInstance.archiveSubject.deleteMany({});
      result(null, deleteAllArchiveSubjects);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = ArchiveSubject;
