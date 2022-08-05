const {
  prismaErrorHandling,
  prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const ExitCauses = function (exitCauses) {
  this.exitCausesTitle = exitCauses.exitCausesTitle;
  this.studentId = exitCauses.studentId;
  this.createdBy = exitCauses.createdBy;
};

ExitCauses.create = async (newExitCauses, result) => {
  try {
    const exitCauses = await prismaInstance.exitCauses.create({
      data: newExitCauses,
    });

    result(null, exitCauses);
  } catch (err) {
    console.log(prismaErrorHandling(err));
    result(prismaErrorHandling(err), null);
  }
};

ExitCauses.createMany = async (newExitCauses, result) => {
  try {
    const exitCauses = await prismaInstance.exitCauses.createMany({
      data: newExitCauses,
    });

    result(null, exitCauses);
  } catch (err) {
    console.log(prismaErrorHandling(err));
    result(prismaErrorHandling(err), null);
  }
};

ExitCauses.findById = async (exitCausesId, result) => {
  try {
    const singleExitCauses = await prismaInstance.exitCauses.findUnique({
      where: {
        idExitCauses: JSON.parse(exitCausesId),
      },
    });

    if (singleExitCauses) {
      result(null, singleExitCauses);
    } else {
      result({
        error: "Not Found",
        code: 404,
        errorMessage: "Not Found exit Causes with this Id",
      });
    }
  } catch (err) {
    console.log(prismaErrorHandling(err));
    result(prismaErrorHandling(err), null);
  }
};

ExitCauses.getAll = async (result) => {
  try {
    const exitCauses = await prismaInstance.exitCauses.findMany();
    result(null, exitCauses);
  } catch (err) {
    console.log(prismaErrorHandling(err));
    result(prismaErrorHandling(err), null);
  }
};

ExitCauses.updateOrCreate = async (data, result) => {
  try {
    console.log("data : ", data);
    var resultt = await prismaInstance.exitCauses.findMany({
      where: {
        studentId: data.studentId,
      },
    }); /* end of query */
    if (resultt.length < 1) {
      var resultt1 = await prismaInstance.exitCauses.create({
        data: data,
      });
      result(null, resultt1);
    } else {
      var resultt2 = await prismaInstance.exitCauses.update({
        where: { idExitCauses: resultt[0].idExitCauses },
        data: {
          exitCausesTitle: data.exitCausesTitle,
        },
      });
      result(null, resultt2);
    } /* end of if */
    //result(null, resultt);
  } catch (error) {
    console.log(prismaErrorHandling(error));
    result(prismaErrorHandling(error), null);
  }
};

ExitCauses.updateById = async (exitCausesId, exitCauses, result) => {
  try {
    const updateExitCauses = await prismaInstance.exitCauses.update({
      where: { idExitCauses: JSON.parse(exitCausesId) },
      data: exitCauses,
    });
    result(null, updateExitCauses);
  } catch (error) {
    console.log(prismaErrorHandling(error));
    result(prismaErrorHandling(error), null);
  }
};

ExitCauses.remove = async (id, result) => {
  try {
    const deleteExitCauses = await prismaInstance.exitCauses.delete({
      where: { idExitCauses: JSON.parse(id) },
    });
    result(null, deleteExitCauses);
  } catch (error) {
    console.log(prismaErrorHandling(error));
    result(prismaErrorHandling(error), null);
  }
};

ExitCauses.removeAll = async (result) => {
  try {
    const deleteAllExitCauses = await prismaInstance.exitCauses.deleteMany({});
    result(null, deleteAllExitCauses);
  } catch (error) {
    console.log(prismaErrorHandling(error));
    result(prismaErrorHandling(error), null);
  }
};

module.exports = ExitCauses;
