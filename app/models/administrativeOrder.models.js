const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const AdministrativeOrder = function (administrativeOrder) {
   this.orderTitleId = administrativeOrder.orderTitleId;
   this.orderNumber = administrativeOrder.orderNumber;
   this.orderDescription = administrativeOrder.orderDescription;
   this.orderYear = administrativeOrder.orderYear;
   this.orderLevel = administrativeOrder.orderLevel;
   this.studentId = administrativeOrder.studentId;
   this.orderDate = administrativeOrder.orderDate;
   this.createdBy = administrativeOrder.createdBy;
};

AdministrativeOrder.create = async (newAdministrativeOrder, result) => {
   try {
      const administrativeOrder =
         await prismaInstance.administrativeOrder.create({
            data: newAdministrativeOrder,
         });

      result(null, administrativeOrder);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

AdministrativeOrder.createManyOrders = async (
   newAdministrativeOrders,
   result
) => {
   try {
      const administrativeOrder =
         await prismaInstance.administrativeOrder.createMany({
            data: newAdministrativeOrders,
         });

      result(null, administrativeOrder);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

AdministrativeOrder.findById = async (administrativeId, result) => {
   try {
      const singleAdministrativeOrder =
         await prismaInstance.administrativeOrder.findUnique({
            where: {
               idAdministrative: JSON.parse(administrativeId),
            },
         });

      if (singleAdministrativeOrder) {
         result(null, singleAdministrativeOrder);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Administrative Order with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

AdministrativeOrder.getAll = async (result) => {
   try {
      const administrativeOrders =
         await prismaInstance.administrativeOrder.findMany({
            include: {
               orderTitle: true,
               student: true,
            },
         });
      result(null, administrativeOrders);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

AdministrativeOrder.updateById = async (
   administrativeId,
   administrativeOrder,
   result
) => {
   try {
      const updateAdministrativeOrder =
         await prismaInstance.administrativeOrder.update({
            where: { idAdministrative: JSON.parse(administrativeId) },
            data: administrativeOrder,
         });
      result(null, updateAdministrativeOrder);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

AdministrativeOrder.remove = async (id, result) => {
   try {
      const deleteAdministrativeOrder =
         await prismaInstance.administrativeOrder.delete({
            where: { idAdministrative: JSON.parse(id) },
         });
      result(null, deleteAdministrativeOrder);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

AdministrativeOrder.removeAll = async (result) => {
   try {
      const deleteAllAdministrativeOrders =
         await prismaInstance.administrativeOrder.deleteMany({});
      result(null, deleteAllAdministrativeOrders);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = AdministrativeOrder;
