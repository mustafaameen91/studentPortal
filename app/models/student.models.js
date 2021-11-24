const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const Student = function (student) {
   this.studentName = student.studentName;
   this.englishName = student.englishName;
   this.mail = student.mail;
   this.dob = student.dob;
   this.sectionId = student.sectionId * 1;
   this.nationality = student.nationality;
   this.gender = student.gender;
   this.note = student.note;
   this.studyType = student.studyType;
   this.collegeNumber = student.collegeNumber;
   this.registerYearId = student.registerYearId * 1;
   this.studentStatusId = student.studentStatusId * 1;
   this.acceptedTypeId = student.acceptedTypeId * 1;
};

Student.create = async (newStudent, result) => {
   console.log(newStudent);
   try {
      const student = await prismaInstance.student.create({
         data: newStudent,
      });
      // console.log(student);
      result(null, student);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Student.findById = async (studentId, result) => {
   try {
      const singleStudent = await prismaInstance.student.findUnique({
         where: {
            idStudent: JSON.parse(studentId),
         },
         include: {
            yearStudy: true,
            ExitCauses: true,
            section: true,
            studentSchool: {
               include: {
                  yearStudy: true,
               },
            },
            studentLevel: {
               take: 1,
               orderBy: {
                  idStudentLevel: "desc",
               },
            },
            studentResponsables: true,
            studentGraduation: true,
            studentImage: true,
            studentStatus: true,
            administrativeOrders: true,
            acceptedType: true,
            nationalInfo: true,
            nationalityCertificate: true,
            ExitCauses: true,
            address: {
               include: {
                  province: {
                     select: {
                        provinceName: true,
                     },
                  },
               },
            },
         },
      });

      if (singleStudent) {
         result(null, singleStudent);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found student with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Student.getBySearch = async (conditions, result) => {
   let studentLevel = {};
   let subCategoryId;
   let studentGraduationId;

   if (conditions.studentLevel) {
      console.log(conditions.studentLevel);
      studentLevel.level = conditions.studentLevel;
      delete conditions.studentLevel;
   }
   if (conditions.subCategoryId) {
      console.log(conditions.subCategoryId);
      subCategoryId = conditions.subCategoryId;
      delete conditions.subCategoryId;
   }
   delete conditions.subCategoryId;

   if (conditions.studentGraduation) {
      console.log(conditions.studentGraduation);
      studentGraduationId = conditions.studentGraduation;
      delete conditions.studentGraduation;
   }
   delete conditions.studentGraduation;
   try {
      const students = await prismaInstance.student.findMany({
         where: {
            ...conditions,
            studentSchool: {
               studySubCategoryId: subCategoryId,
            },
            studentGraduation: {
               graduationDate: studentGraduationId,
            },
         },
         include: {
            ExitCauses: true,
            yearStudy: true,
            section: true,
            nationalInfo: true,
            nationalityCertificate: true,
            studentSchool: {
               include: {
                  yearStudy: true,
                  passType: true,
                  certificateStatus: true,
                  studySubCategory: {
                     include: {
                        studyCategory: true,
                     },
                  },
               },
            },
            studentLevel: {
               take: 1,
               orderBy: {
                  idStudentLevel: "desc",
               },
               where: {
                  ...studentLevel,
               },
            },
            studentGraduation: {
               include: {
                  yearStudy: true,
               },
            },
            studentImage: true,
            studentStatus: true,
            acceptedType: true,
            studentResponsables: true,
            address: {
               include: {
                  province: {
                     select: {
                        provinceName: true,
                     },
                  },
               },
            },
         },
      });

      let filteredStudent = students.filter((student) => {
         return student.studentLevel.length > 0;
      });
      result(null, filteredStudent);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Student.getStudentsCount = async (conditions, result) => {
   let studentLevel = {};
   if (conditions.studentLevel) {
      console.log(conditions.studentLevel);
      studentLevel.level = conditions.studentLevel;
      delete conditions.studentLevel;
   }
   try {
      const students = await prismaInstance.student.findMany({
         where: {
            ...conditions,
         },
         include: {
            yearStudy: true,
            section: true,
            studentSchool: true,
            studentLevel: {
               take: 1,
               orderBy: {
                  idStudentLevel: "desc",
               },
               where: {
                  ...studentLevel,
               },
            },
            studentGraduation: true,
            studentImage: true,
            studentStatus: true,
            acceptedType: true,
            address: {
               include: {
                  province: {
                     select: {
                        provinceName: true,
                     },
                  },
               },
            },
         },
      });
      result(null, { studentsCount: students.length });
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Student.getAll = async (result) => {
   try {
      const students = await prismaInstance.student.findMany({
         include: {
            yearStudy: true,
            section: true,
            studentSchool: true,
            studentLevel: {
               take: 1,
               orderBy: {
                  idStudentLevel: "desc",
               },
            },
            studentGraduation: true,
            studentImage: true,
            studentStatus: true,
            acceptedType: true,
            address: {
               include: {
                  province: {
                     select: {
                        provinceName: true,
                     },
                  },
               },
            },
         },
      });
      result(null, students);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Student.updateById = async (studentId, student, studentInfo, result) => {
   try {
      console.log(studentInfo);
      const updateStudent = await prismaInstance.student.update({
         where: { idStudent: JSON.parse(studentId) },
         data: student,
      });
      const updateStudentLevel = await prismaInstance.studentLevel.update({
         where: {
            idStudentLevel: parseInt(studentInfo.studentLevel.idStudentLevel),
         },
         data: {
            level: studentInfo.studentLevel.level,
            class: studentInfo.studentLevel.class,
            yearStudyId: parseInt(studentInfo.studentLevel.yearStudyId),
            studentId: parseInt(studentInfo.studentLevel.studentId),
         },
      });
      result(null, {
         updateStudent: updateStudent,
         updateStudentLevel: updateStudentLevel,
      });
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Student.remove = async (id, result) => {
   try {
      const deleteStudent = await prismaInstance.student.delete({
         where: { idStudent: JSON.parse(id) },
      });
      result(null, deleteStudent);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Student.removeAll = async (result) => {
   try {
      const deleteAllStudents = await prismaInstance.student.deleteMany({});
      result(null, deleteAllStudents);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = Student;
