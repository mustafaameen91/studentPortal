const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const ArchiveImage = function (archiveImage) {
   this.imagePath = imagePath.imagePath;
   this.archiveId = archiveImage.archiveId;
};

ArchiveImage.create = async (newArchiveImage, result) => {
   try {
      const archiveImage = await prismaInstance.archiveImage.create({
         data: newArchiveImage,
      });
      console.log(archiveImage);
      result(null, archiveImage);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

ArchiveImage.createMany = async (newArchiveImages, result) => {
   console.log(newArchiveImages);
   try {
      const archiveImages = await prismaInstance.archiveImage.createMany({
         data: newArchiveImages,
      });
      console.log(archiveImages);
      result(null, archiveImages);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

ArchiveImage.findById = async (archiveImageId, result) => {
   try {
      const singleArchiveImage = await prismaInstance.archiveImage.findUnique({
         where: {
            idArchiveImage: JSON.parse(archiveImageId),
         },
      });

      if (singleArchiveImage) {
         result(null, singleArchiveImage);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found Archive Image with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

ArchiveImage.getAll = async (result) => {
   try {
      const archiveImages = await prismaInstance.archiveImage.findMany();
      result(null, archiveImages);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

ArchiveImage.updateById = async (archiveImageId, archiveImage, result) => {
   try {
      const updateArchiveImage = await prismaInstance.archiveImage.update({
         where: { idArchiveImage: JSON.parse(archiveImageId) },
         data: archiveImage,
      });
      result(null, updateArchiveImage);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

ArchiveImage.remove = async (id, result) => {
   try {
      const deleteArchiveImage = await prismaInstance.archiveImage.delete({
         where: { idArchiveImage: JSON.parse(id) },
      });
      result(null, deleteArchiveImage);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

ArchiveImage.removeAll = async (result) => {
   try {
      const deleteAllArchiveImages =
         await prismaInstance.archiveImage.deleteMany({});
      result(null, deleteAllArchiveImages);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = ArchiveImage;
