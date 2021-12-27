const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const SectionCost = function (sectionCost) {
   this.sectionId = sectionCost.sectionId;
   this.cost = sectionCost.cost;
   this.attempts = sectionCost.attempts;
   this.level = sectionCost.level;
};

SectionCost.create = async (newSectionCost, result) => {
   try {
      const sectionCost = await prismaInstance.sectionCost.create({
         data: newSectionCost,
      });

      result(null, sectionCost);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

SectionCost.findByIdOfSectionAndLevel = async (sectionId, level, result) => {
   try {
      const singleSectionCost = await prismaInstance.sectionCost.findFirst({
         where: {
            AND: [
               {
                  sectionId: parseInt(sectionId),
               },
               {
                  level: parseInt(level),
               },
            ],
         },
      });

      if (singleSectionCost) {
         result(null, singleSectionCost);
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

SectionCost.findById = async (sectionCostId, result) => {
   try {
      const singleSectionCost = await prismaInstance.sectionCost.findUnique({
         where: {
            idSectionCost: JSON.parse(sectionCostId),
         },
      });

      if (singleSectionCost) {
         result(null, singleSectionCost);
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

SectionCost.getAll = async (result) => {
   try {
      const sectionCosts = await prismaInstance.sectionCost.findMany({
         include: {
            section: true,
         },
      });
      result(null, sectionCosts);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

SectionCost.updateById = async (sectionCostId, sectionCost, result) => {
   try {
      const updateSectionCost = await prismaInstance.sectionCost.update({
         where: { idSectionCost: JSON.parse(sectionCostId) },
         data: sectionCost,
      });
      result(null, updateSectionCost);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

SectionCost.remove = async (id, result) => {
   try {
      const deleteSectionCost = await prismaInstance.sectionCost.delete({
         where: { idSectionCost: JSON.parse(id) },
      });
      result(null, deleteSectionCost);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

SectionCost.removeAll = async (result) => {
   try {
      const deleteAllSectionCosts = await prismaInstance.sectionCost.deleteMany(
         {}
      );
      result(null, deleteAllSectionCosts);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = SectionCost;
