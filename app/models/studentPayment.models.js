const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const StudentPayment = function (studentPayment) {
   this.feesPay = studentPayment.feesPay;
   this.studentId = studentPayment.studentId;
};

StudentPayment.create = async (newStudentPayment, result) => {
   try {
      const studentPayment = await prismaInstance.studentPayment.createMany({
         data: newStudentPayment,
      });

      result(null, studentPayment);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentPayment.findById = async (studentPaymentId, result) => {
   try {
      const singleStudentPayment =
         await prismaInstance.studentPayment.findUnique({
            where: {
               idStudentPayment: JSON.parse(studentPaymentId),
            },
         });

      if (singleStudentPayment) {
         result(null, singleStudentPayment);
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

StudentPayment.getAll = async (result) => {
   try {
      const studentPayments = await prismaInstance.studentPayment.findMany();
      result(null, studentPayments);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

StudentPayment.updateById = async (
   studentPaymentId,
   studentPayment,
   result
) => {
   try {
      const updateStudentPayment = await prismaInstance.studentPayment.update({
         where: { idStudentPayment: JSON.parse(studentPaymentId) },
         data: studentPayment,
      });
      result(null, updateStudentPayment);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentPayment.remove = async (id, result) => {
   try {
      const deleteStudentPayment = await prismaInstance.studentPayment.delete({
         where: { idStudentPayment: JSON.parse(id) },
      });
      result(null, deleteStudentPayment);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

StudentPayment.removeAll = async (result) => {
   try {
      const deleteAllStudentPayments =
         await prismaInstance.studentPayment.deleteMany({});
      result(null, deleteAllStudentPayments);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = StudentPayment;
