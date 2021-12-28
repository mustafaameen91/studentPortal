const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const StudentPayment = function (studentPayment) {
   this.studentId = studentPayment.studentId;
   this.discountId = studentPayment.discountId;
   this.level = studentPayment.level;
};

StudentPayment.create = async (newStudentPayment, result) => {
   try {
      const studentPayment = await prismaInstance.studentPayment.create({
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
      const singleStudentPayment = await prismaInstance.studentPayment.findMany(
         {
            where: {
               studentId: JSON.parse(studentPaymentId),
            },
            include: {
               acceptedTypeDiscount: true,
            },
         }
      );

      if (singleStudentPayment.length > 0) {
         result(null, singleStudentPayment[0]);
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
      const studentPayments = await prismaInstance.studentPayment.findMany({
         include: {
            StudentFees: {
               include: {
                  payType: true,
                  studentPayment: {
                     include: {
                        student: true,
                        acceptedTypeDiscount: true,
                     },
                  },
               },
            },
            acceptedTypeDiscount: true,
            student: {
               include: {
                  studentLevel: {
                     take: 1,
                     orderBy: {
                        idStudentLevel: "desc",
                     },
                  },
                  section: {
                     include: {
                        SectionCost: true,
                     },
                  },
               },
            },
         },
      });
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
