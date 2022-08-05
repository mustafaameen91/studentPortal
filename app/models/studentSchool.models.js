const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const StudentSchool = function (studentSchool) {
   this.schoolName = studentSchool.schoolName;
   this.graduationDate = studentSchool.graduationDate;
   this.totalMarks = studentSchool.totalMarks * 1;
   this.average = studentSchool.average;
   this.documentNumber = studentSchool.documentNumber * 1;
   this.lessonCount = studentSchool.lessonCount * 1;
   this.directorate = studentSchool.directorate;
   this.documentDate = studentSchool.documentDate;
   this.studySubCategoryId = studentSchool.studySubCategoryId * 1;
   this.studentId = studentSchool.studentId * 1;
   this.passTypeId = studentSchool.passTypeId * 1;
   this.documentDigit = studentSchool.documentDigit * 1;
   this.examNumber = studentSchool.examNumber;
   this.certificateStatusId = studentSchool.certificateStatusId;
   this.certificateStatusDescription =
      studentSchool.certificateStatusDescription;
   this.correctNumberAnswer = studentSchool.correctNumberAnswer;
   this.correctDateAnswer = studentSchool.correctDateAnswer;
   this.correctNumber = studentSchool.correctNumber;
   this.correctDate = studentSchool.correctDate;
};

StudentSchool.create = async (newStudentSchool, result) => {
   let data = {
      schoolName: newStudentSchool.schoolName,
      graduationDate: newStudentSchool.graduationDate,
      totalMarks: newStudentSchool.totalMarks ,
      average: newStudentSchool.average ,
      documentNumber: newStudentSchool.documentNumber ,
      lessonCount: newStudentSchool.lessonCount ,
      directorate: newStudentSchool.directorate,
      documentDate: newStudentSchool.documentDate,
      studySubCategoryId: newStudentSchool.studySubCategoryId,
      studentId: newStudentSchool.studentId ,
      passTypeId: newStudentSchool.passTypeId ,
      documentDigit: newStudentSchool.documentDigit ,
      examNumber: newStudentSchool.examNumber,
      certificateStatusId: newStudentSchool.certificateStatusId ,
      certificateStatusDescription:
         newStudentSchool.certificateStatusDescription,
      correctNumberAnswer: newStudentSchool.correctNumberAnswer,
      correctDateAnswer: newStudentSchool.correctDateAnswer,
      correctNumber: newStudentSchool.correctNumber,
      correctDate: newStudentSchool.correctDate,
   };
   try {
      const studentSchool = await prismaInstance.studentSchool.upsert({
         where: {
            idStudentSchool: newStudentSchool.idStudentSchool
               ? newStudentSchool.idStudentSchool
               : -1,
         },
         create: data,
         update: data,
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
