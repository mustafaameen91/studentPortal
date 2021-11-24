const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const StudentResponsible = function (studentResponsible) {
   this.responsibleName = studentResponsible.responsibleName;
   this.responsiblePhone = studentResponsible.responsiblePhone;
   this.studentId = studentResponsible.studentId;
};

StudentResponsible.create = async (newStudentResponsible, result) => {
   try {
      const studentResponsible = await prismaInstance.studentResponsible.upsert(
         {
            where: {
               idStudentResponsible: newStudentResponsible.idStudentResponsible
                  ? parseInt(newStudentResponsible.idStudentResponsible)
                  : -1,
            },
            update: newStudentResponsible,
            create: newStudentResponsible,
         }
      );

      result(null, studentResponsible);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentResponsible.createManyResponsible = async (
   studentsResponsible,
   result
) => {
   try {
      const studentResponsible =
         await prismaInstance.studentResponsible.createMany({
            data: studentsResponsible,
         });

      result(null, studentResponsible);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentResponsible.findById = async (studentResponsibleId, result) => {
   try {
      const singleStudentResponsible =
         await prismaInstance.studentResponsible.findUnique({
            where: {
               idStudentResponsible: JSON.parse(studentResponsibleId),
            },
         });

      if (singleStudentResponsible) {
         result(null, singleStudentResponsible);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Student Responsible with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentResponsible.getAll = async (result) => {
   try {
      const studentsResponsible =
         await prismaInstance.studentResponsible.findMany();
      result(null, studentsResponsible);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentResponsible.updateById = async (
   studentResponsibleId,
   studentResponsible,
   result
) => {
   try {
      const updateStudentResponsible =
         await prismaInstance.studentResponsible.update({
            where: { idStudentResponsible: JSON.parse(studentResponsibleId) },
            data: studentResponsible,
         });
      result(null, updateStudentResponsible);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentResponsible.remove = async (id, result) => {
   try {
      const deleteStudentResponsible =
         await prismaInstance.studentResponsible.delete({
            where: { idStudentResponsible: JSON.parse(id) },
         });
      result(null, deleteStudentResponsible);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentResponsible.removeAll = async (result) => {
   try {
      const deleteAllStudentResponsible =
         await prismaInstance.studentResponsible.deleteMany({});
      result(null, deleteAllStudentResponsible);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = StudentResponsible;
