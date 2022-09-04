const {
  prismaErrorHandling,
  prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const StudentLevel = function (studentLevel) {
  this.level = studentLevel.level;
  this.class = studentLevel.class;
  this.yearStudyId = studentLevel.yearStudyId;
  this.studentId = studentLevel.studentId;
};

StudentLevel.create = async (newStudentLevel, result) => {
  try {
    const studentLevel = await prismaInstance.studentLevel.create({
      data: newStudentLevel,
    });

    result(null, studentLevel);
  } catch (err) {
    console.log(prismaErrorHandling(err));
    result(prismaErrorHandling(err), null);
  }
};

StudentLevel.findById = async (studentLevelId, result) => {
  try {
    const singleStudentLevel = await prismaInstance.studentLevel.findUnique({
      where: {
        idStudentLevel: JSON.parse(studentLevelId),
      },
    });

    if (singleStudentLevel) {
      result(null, singleStudentLevel);
    } else {
      result({
        error: "Not Found",
        code: 404,
        errorMessage: "Not Found Student Level with this Id",
      });
    }
  } catch (err) {
    console.log(prismaErrorHandling(err));
    result(prismaErrorHandling(err), null);
  }
};

StudentLevel.getAll = async (result) => {
  try {
    const studentLevels = await prismaInstance.studentLevel.findMany();
    result(null, studentLevels);
  } catch (err) {
    console.log(prismaErrorHandling(err));
    result(prismaErrorHandling(err), null);
  }
};

StudentLevel.updateById = async (studentLevelId, studentLevel, result) => {
  try {
    const updateStudentLevel = await prismaInstance.studentLevel.update({
      where: { idStudentLevel: JSON.parse(studentLevelId) },
      data: studentLevel,
    });
    result(null, updateStudentLevel);
  } catch (error) {
    console.log(prismaErrorHandling(error));
    result(prismaErrorHandling(error), null);
  }
};

StudentLevel.remove = async (id, result) => {
  try {
    const deleteStudentLevel = await prismaInstance.studentLevel.delete({
      where: { idStudentLevel: JSON.parse(id) },
    });
    result(null, deleteStudentLevel);
  } catch (error) {
    console.log(prismaErrorHandling(error));
    result(prismaErrorHandling(error), null);
  }
};

StudentLevel.removeAll = async (result) => {
  try {
    const deleteAllStudentLevel = await prismaInstance.studentLevel.deleteMany(
      {}
    );
    result(null, deleteAllStudentLevel);
  } catch (error) {
    console.log(prismaErrorHandling(error));
    result(prismaErrorHandling(error), null);
  }
};

StudentLevel.findByUserId = async (studentId, resulte) => {
  try {
    const studentLevel = await prismaInstance.studentLevel.findMany({
      where: {
        studentId: studentId,
      },
    }); /* /studentLevel */
    resulte(null, studentLevel);
  } catch (error) {
    console.log(prismaErrorHandling(error));
    resulte(error, null);
  } /* end of tryCatch */
}; /* /findByUserId */

module.exports = StudentLevel;
