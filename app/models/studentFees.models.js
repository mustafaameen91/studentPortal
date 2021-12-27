const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const StudentFees = function (studentFees) {
   this.feesPay = studentFees.feesPay;
   this.payTypeId = studentFees.payTypeId;
   this.payNote = studentFees.payNote;
   this.createdBy = studentFees.createdBy;
   this.checkNumber = studentFees.checkNumber;
   this.studentPaymentId = studentFees.studentPaymentId;
};

StudentFees.create = async (newStudentFees, result) => {
   try {
      const studentFees = await prismaInstance.studentFees.create({
         data: newStudentFees,
      });

      result(null, studentFees);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentFees.findByStudentId = async (studentId, result) => {
   try {
      const singleStudentFees = await prismaInstance.studentFees.findMany({
         where: {
            studentPayment: {
               studentId: parseInt(studentId),
            },
         },
         include: {
            payType: true,
            studentPayment: true,
            user: true,
         },
      });

      if (singleStudentFees) {
         result(null, singleStudentFees);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Pass Type with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentFees.findById = async (studentFeesId, result) => {
   try {
      const singleStudentFees = await prismaInstance.studentFees.findUnique({
         where: {
            idStudentFees: JSON.parse(studentFeesId),
         },
      });

      if (singleStudentFees) {
         result(null, singleStudentFees);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Pass Type with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentFees.getLast = async (result) => {
   try {
      const studentFees = await prismaInstance.studentFees.findMany({
         take: 1,
         orderBy: {
            idStudentFees: "desc",
         },
      });
      result(null, studentFees);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentFees.getAll = async (result) => {
   try {
      const studentFeess = await prismaInstance.studentFees.findMany();
      result(null, studentFeess);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentFees.updateById = async (studentFeesId, studentFees, result) => {
   try {
      const updateStudentFees = await prismaInstance.studentFees.update({
         where: { idStudentFees: JSON.parse(studentFeesId) },
         data: studentFees,
      });
      result(null, updateStudentFees);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentFees.remove = async (id, result) => {
   try {
      const deleteStudentFees = await prismaInstance.studentFees.delete({
         where: { idStudentFees: JSON.parse(id) },
      });
      result(null, deleteStudentFees);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentFees.removeAll = async (result) => {
   try {
      const deleteAllStudentFeess = await prismaInstance.studentFees.deleteMany(
         {}
      );
      result(null, deleteAllStudentFeess);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = StudentFees;
