const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const PayType = function (payType) {
   this.typeName = payType.typeName;
};

PayType.create = async (newPayType, result) => {
   try {
      const payType = await prismaInstance.payType.create({
         data: newPayType,
      });

      result(null, payType);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

PayType.findById = async (payTypeId, result) => {
   try {
      const singlePayType = await prismaInstance.payType.findUnique({
         where: {
            idPayType: JSON.parse(payTypeId),
         },
      });

      if (singlePayType) {
         result(null, singlePayType);
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

PayType.getAll = async (result) => {
   try {
      const payTypes = await prismaInstance.payType.findMany({});
      result(null, payTypes);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

PayType.updateById = async (payTypeId, payType, result) => {
   try {
      const updatePayType = await prismaInstance.payType.update({
         where: { idPayType: JSON.parse(payTypeId) },
         data: payType,
      });
      result(null, updatePayType);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

PayType.remove = async (id, result) => {
   try {
      const deletePayType = await prismaInstance.payType.delete({
         where: { idPayType: JSON.parse(id) },
      });
      result(null, deletePayType);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

PayType.removeAll = async (result) => {
   try {
      const deleteAllPayTypes = await prismaInstance.payType.deleteMany({});
      result(null, deleteAllPayTypes);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = PayType;
