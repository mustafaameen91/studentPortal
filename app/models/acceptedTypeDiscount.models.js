const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const AcceptedTypeDiscount = function (acceptedTypeDiscount) {
   this.acceptedType = acceptedTypeDiscount.acceptedType;
   this.discount = acceptedTypeDiscount.discount;
};

AcceptedTypeDiscount.create = async (newAcceptedTypeDiscount, result) => {
   try {
      const acceptedTypeDiscount =
         await prismaInstance.acceptedTypeDiscount.create({
            data: newAcceptedTypeDiscount,
         });

      result(null, acceptedTypeDiscount);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

AcceptedTypeDiscount.findById = async (acceptedTypeDiscountId, result) => {
   try {
      const singleAcceptedTypeDiscount =
         await prismaInstance.acceptedTypeDiscount.findUnique({
            where: {
               idAcceptedTypeDiscount: JSON.parse(acceptedTypeDiscountId),
            },
         });

      if (singleAcceptedTypeDiscount) {
         result(null, singleAcceptedTypeDiscount);
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

AcceptedTypeDiscount.getAll = async (result) => {
   try {
      const acceptedTypeDiscounts =
         await prismaInstance.acceptedTypeDiscount.findMany();
      result(null, acceptedTypeDiscounts);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

AcceptedTypeDiscount.updateById = async (
   acceptedTypeDiscountId,
   acceptedTypeDiscount,
   result
) => {
   try {
      const updateAcceptedTypeDiscount =
         await prismaInstance.acceptedTypeDiscount.update({
            where: {
               idAcceptedTypeDiscount: JSON.parse(acceptedTypeDiscountId),
            },
            data: acceptedTypeDiscount,
         });
      result(null, updateAcceptedTypeDiscount);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

AcceptedTypeDiscount.remove = async (id, result) => {
   try {
      const deleteAcceptedTypeDiscount =
         await prismaInstance.acceptedTypeDiscount.delete({
            where: { idAcceptedTypeDiscount: JSON.parse(id) },
         });
      result(null, deleteAcceptedTypeDiscount);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

AcceptedTypeDiscount.removeAll = async (result) => {
   try {
      const deleteAllAcceptedTypeDiscounts =
         await prismaInstance.acceptedTypeDiscount.deleteMany({});
      result(null, deleteAllAcceptedTypeDiscounts);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = AcceptedTypeDiscount;
