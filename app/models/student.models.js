const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const Student = function (student) {
   this.studentName = student.studentName;
   this.englishName = student.englishName;
   this.password = student.password;
   this.mail = student.mail;
   this.dob = student.dob;
   this.sectionId = student.sectionId;
   this.nationality = student.nationality;
   this.phone = student.phone;
   this.gender = student.gender;
   this.relationships = student.relationships;
   this.note = student.note;
   this.studyType = student.studyType;
   this.religion = student.religion;
   this.motherName = student.motherName;
   this.collegeNumber = student.collegeNumber;
   this.registerYearId = student.registerYearId;
   this.studentStatusId = student.studentStatusId;
   this.acceptedTypeId = student.acceptedTypeId;
};

Student.create = async (newStudent, result) => {
   try {
      const student = await prismaInstance.student.create({
         data: newStudent,
      });

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
            section: true,
            studentSchool: true,
            studentLevel: true,
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
   console.log(conditions);
   if (conditions.studentLevel) {
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
      console.log(students);
      let filteredStudent = students.filter((student) => {
         return student.studentLevel.length > 0;
      });
      result(null, filteredStudent);
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
            studentLevel: true,
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

Student.updateById = async (studentId, student, result) => {
   try {
      const updateStudent = await prismaInstance.student.update({
         where: { idStudent: JSON.parse(studentId) },
         data: student,
      });
      result(null, updateStudent);
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
