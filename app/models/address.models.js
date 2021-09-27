const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const Address = function (address) {
   this.provinceId = address.provinceId;
   this.district = address.district;
   this.avenue = address.avenue;
   this.houseNumber = address.houseNumber;
   this.streetNumber = address.streetNumber;
   this.studentId = address.studentId;
};

Address.create = async (newAddress, result) => {
   try {
      const address = await prismaInstance.address.create({
         data: newAddress,
      });
      console.log(address);
      result(null, address);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Address.findById = async (addressId, result) => {
   try {
      const singleAddress = await prismaInstance.address.findUnique({
         where: {
            idAddress: JSON.parse(addressId),
         },
      });

      if (singleAddress) {
         result(null, singleAddress);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Address with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Address.getAll = async (result) => {
   try {
      const addresses = await prismaInstance.address.findMany();
      result(null, addresses);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Address.updateById = async (addressId, address, result) => {
   try {
      const updateAddress = await prismaInstance.address.update({
         where: { idAddress: JSON.parse(addressId) },
         data: address,
      });
      result(null, updateAddress);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Address.remove = async (id, result) => {
   try {
      const deleteAddress = await prismaInstance.address.delete({
         where: { idAddress: JSON.parse(id) },
      });
      result(null, deleteAddress);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Address.removeAll = async (result) => {
   try {
      const deleteAllAddresses = await prismaInstance.address.deleteMany({});
      result(null, deleteAllAddresses);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = Address;
