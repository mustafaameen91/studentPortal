const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const StudentSchool = function (studentSchool) {
   this.schoolName = studentSchool.schoolName;
   this.graduationDate = studentSchool.graduationDate;
   this.totalMarks = studentSchool.totalMarks;
   this.average = studentSchool.average;
   this.documentNumber = studentSchool.documentNumber;
   this.lessonCount = studentSchool.lessonCount;
   this.Directorate = studentSchool.Directorate;
   this.documentDate = studentSchool.documentDate;
   this.studySubCategoryId = studentSchool.studySubCategoryId;
   this.studentId = studentSchool.studentId;
   this.certificateStatusId = studentSchool.certificateStatusId;
   this.certificateStatusDescription =
      studentSchool.certificateStatusDescription;
};

StudentSchool.create = async (newStudentSchool, result) => {
   try {
      const studentSchool = await prismaInstance.studentSchool.create({
         data: newStudentSchool,
      });

      result(null, studentSchool);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentSchool.findById = async (studentSchoolId, result) => {
   try {
      const singleStudentSchool = await prismaInstance.studentSchool.findUnique(
         {
            where: {
               idStudentSchool: JSON.parse(studentSchoolId),
            },
         }
      );

      if (singleStudentSchool) {
         result(null, singleStudentSchool);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Student School with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentSchool.getAll = async (result) => {
   try {
      const studentSchools = await prismaInstance.studentSchool.findMany();
      result(null, studentSchools);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentSchool.updateById = async (studentSchoolId, studentSchool, result) => {
   try {
      const updateStudentSchool = await prismaInstance.studentSchool.update({
         where: { idStudentSchool: JSON.parse(studentSchoolId) },
         data: studentSchool,
      });
      result(null, updateStudentSchool);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentSchool.remove = async (id, result) => {
   try {
      const deleteStudentSchool = await prismaInstance.studentSchool.delete({
         where: { idStudentSchool: JSON.parse(id) },
      });
      result(null, deleteStudentSchool);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentSchool.removeAll = async (result) => {
   try {
      const deleteAllStudentSchool =
         await prismaInstance.studentSchool.deleteMany({});
      result(null, deleteAllStudentSchool);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = StudentSchool;
