const {
  prismaErrorHandling,
  prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const AdministrativeOrder = function (administrativeOrder) {
  this.orderTitleId = administrativeOrder.orderTitleId;
  this.orderNumber = administrativeOrder.orderNumber;
  this.orderDescription = administrativeOrder.orderDescription;
  this.orderYear = administrativeOrder.orderYear * 1;
  this.orderLevel = administrativeOrder.orderLevel;
  this.studentId = administrativeOrder.studentId;
  this.orderDate = new Date(administrativeOrder.orderDate);
  this.createdBy = administrativeOrder.createdBy;
};

AdministrativeOrder.create = async (newAdministrativeOrder, result) => {
  try {
    const administrativeOrder = await prismaInstance.administrativeOrder.create(
      {
        data: newAdministrativeOrder,
      }
    );

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
    let studentStatusId = newAdministrativeOrders[0].studentStatusId;

    console.log(studentStatusId);

    let notes = newAdministrativeOrders.map((admin) => {
      return {
        studentId: admin.studentId * 1,
        note:
          admin.studentNote + ` / ${admin.orderTitleString} - ${admin.year}`,
      };
    });

    let adminData = newAdministrativeOrders.map((order) => {
      return {
        orderTitleId: order.orderTitleId * 1,
        orderNumber: order.orderNumber,
        orderDescription: order.orderDescription,
        orderYear: order.orderYear * 1,
        orderLevel: order.orderLevel * 1,
        studentId: order.studentId * 1,
        orderDate: new Date(order.orderDate),
        createdBy: order.createdBy * 1,
      };
    });

    const administrativeOrder =
      await prismaInstance.administrativeOrder.createMany({
        data: adminData,
      });

    let condition = newAdministrativeOrders.map((student, index) => {
      return student.studentId;
    });

    const changeStudentStatus = await prismaInstance.student.updateMany({
      where: {
        idStudent: { in: condition },
      },
      data: {
        studentStatusId: studentStatusId,
      },
    });

    let updateNote = await prismaInstance.$transaction(
      notes.map((note) =>
        prismaInstance.student.update({
          where: { idStudent: note.studentId },
          data: { note: note.note },
        })
      )
    );

    if (studentStatusId * 1 == 3) {
      let data = condition.map((id) => {
        return {
          studentId: id,
          graduationDate: adminData[0].orderYear,
        };
      });
      console.log(data);
      const addStudentGraduation =
        await prismaInstance.studentGraduation.createMany({
          data: data,
        });

      console.log(addStudentGraduation);
    }

    result(null, {
      administrativeOrder: administrativeOrder,
      studentStatus: changeStudentStatus,
      updateNote: updateNote,
    });
  } catch (err) {
    console.log(prismaErrorHandling(err));
    result(prismaErrorHandling(err), null);
  }
};

AdministrativeOrder.createManyOrdersUpgrade = async (
  newAdministrativeOrders,
  result
) => {
  try {
    let studentStatusId = newAdministrativeOrders[0].studentStatusId;
    let adminData = newAdministrativeOrders.map((order) => {
      return {
        orderTitleId: order.orderTitleId * 1,
        orderNumber: order.orderNumber,
        orderDescription: order.orderDescription,
        orderYear: order.orderYear * 1,
        orderLevel: order.orderLevel * 1,
        studentId: order.studentId * 1,
        orderDate: new Date(order.orderDate),
        createdBy: order.createdBy * 1,
      };
    });

    const administrativeOrder =
      await prismaInstance.administrativeOrder.createMany({
        data: adminData,
      });

    let condition = newAdministrativeOrders.map((student, index) => {
      return student.studentId;
    });

    let studentLevels = newAdministrativeOrders.map((student, index) => {
      return {
        studentId: student.studentId * 1,
        level: student.level * 1,
        yearStudyId: student.orderYear * 1,
        class: student.class,
      };
    });

    if (studentStatusId * 1 == 3) {
      let data = condition.map((id) => {
        return {
          studentId: id,
          graduationDate: adminData[0].orderYear,
        };
      });
      console.log(data);
      const addStudentGraduation =
        await prismaInstance.studentGraduation.createMany({
          data: data,
        });

      console.log(addStudentGraduation);
    }

    const changeStudentStatus = await prismaInstance.student.updateMany({
      where: {
        idStudent: { in: condition },
      },
      data: {
        studentStatusId: studentStatusId,
      },
    });

    const studentsLevel = await prismaInstance.studentLevel.createMany({
      data: studentLevels,
    });

    console.log({
      administrativeOrder: administrativeOrder,
      studentStatus: changeStudentStatus,
      studentLevel: studentsLevel,
    });

    result(null, {
      administrativeOrder: administrativeOrder,
      studentStatus: changeStudentStatus,
      studentLevel: studentsLevel,
    });
  } catch (err) {
    console.log(prismaErrorHandling(err));
    result(prismaErrorHandling(err), null);
  }
};

AdministrativeOrder.getByFilter = async (filter, result) => {
  try {
    let studentFilter = {
      sectionId: filter.sectionId,
      studentStatusId: filter.studentStatusId,
      gender: filter.gender,
      studyType: filter.studyType,
      registerYearId: filter.registerYearId,
      studentGraduation: {
        graduationDate: filter.studentGraduation,
      },
      studentLevel: {
        some: {
          level: filter.studentLevel,
        },
      },
      studentSchool: {
        studySubCategoryId: filter.studySubCategoryId,
      },
    };

    let adminOrderFilter = {
      orderTitleId: filter.orderTitleId,
      orderNumber: filter.orderNumber,
      orderYear: filter.orderYear,
      orderLevel: filter.orderLevel,
      orderDate: filter.orderDate,
      studentId: filter.studentId,
    };

    const singleAdministrativeOrder =
      await prismaInstance.administrativeOrder.findMany({
        where: {
          ...adminOrderFilter,
          student: {
            ...studentFilter,
          },
        },
        include: {
          user: true,
          orderTitle: true,
          yearStudy: true,
          student: {
            include: {
              ExitCauses: true,
              yearStudy: true,
              section: true,
              nationalInfo: true,
              nationalityCertificate: true,
              studentSchool: {
                include: {
                  yearStudy: true,
                  passType: true,
                  certificateStatus: true,
                  studySubCategory: {
                    include: {
                      studyCategory: true,
                    },
                  },
                },
              },
              studentLevel: {
                take: 1,
                orderBy: {
                  idStudentLevel: "desc",
                },
                include: {
                  yearStudy: true,
                },
              },
              studentGraduation: {
                include: {
                  yearStudy: true,
                },
              },
              studentImage: true,
              studentStatus: true,
              acceptedType: true,
              studentResponsables: true,
              address: {
                include: {
                  province: {
                    select: {
                      provinceName: true,
                    },
                  },
                },
              },
            },
          },
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

AdministrativeOrder.findByStudentId = async (studentId, result) => {
  try {
    const singleAdministrativeOrder =
      await prismaInstance.administrativeOrder.findMany({
        where: {
          studentId: JSON.parse(studentId),
        },
        include: {
          user: true,
          orderTitle: true,
          yearStudy: true,
          student: {
            include: {
              yearStudy: true,
              section: true,
              studentSchool: true,
              studentLevel: {
                take: 1,
                orderBy: {
                  idStudentLevel: "desc",
                },
                include: {
                  yearStudy: true,
                },
              },
              ExitCauses: true,
              studentGraduation: {
                include: {
                  yearStudy: true,
                },
              },
              studentImage: true,
              studentStatus: true,
              acceptedType: true,
              address: {
                include: {
                  province: {
                    select: {
                      provinceName: true,
                    },
                  },
                },
              },
            },
          },
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

AdministrativeOrder.findById = async (administrativeId, result) => {
  try {
    const singleAdministrativeOrder =
      await prismaInstance.administrativeOrder.findUnique({
        where: {
          idAdministrative: JSON.parse(administrativeId),
        },
        include: {
          user: true,
          orderTitle: true,
          yearStudy: true,
          student: {
            include: {
              ExitCauses: true,
              yearStudy: true,
              section: true,
              studentSchool: true,
              studentLevel: {
                take: 1,
                orderBy: {
                  idStudentLevel: "desc",
                },
                include: {
                  yearStudy: true,
                },
              },
              studentGraduation: true,
              studentImage: true,
              studentStatus: true,
              acceptedType: true,
              address: {
                include: {
                  province: {
                    select: {
                      provinceName: true,
                    },
                  },
                },
              },
            },
          },
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
          user: true,
          orderTitle: true,
          yearStudy: true,
          student: {
            include: {
              ExitCauses: true,
              yearStudy: true,
              section: true,
              nationalInfo: true,
              nationalityCertificate: true,
              studentSchool: {
                include: {
                  yearStudy: true,
                  passType: true,
                  certificateStatus: true,
                  studySubCategory: {
                    include: {
                      studyCategory: true,
                    },
                  },
                },
              },
              studentLevel: {
                take: 1,
                orderBy: {
                  idStudentLevel: "desc",
                },
                include: {
                  yearStudy: true,
                },
              },
              studentGraduation: {
                include: {
                  yearStudy: true,
                },
              },
              studentImage: true,
              studentStatus: true,
              acceptedType: true,
              studentResponsables: true,
              address: {
                include: {
                  province: {
                    select: {
                      provinceName: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    result(null, administrativeOrders);
  } catch (err) {
    console.log(prismaErrorHandling(err));
    result(prismaErrorHandling(err), null);
  }
};

AdministrativeOrder.updateManyOrder = async (administrativeOrder, result) => {
  let data = {
    orderTitleId: administrativeOrder.orderTitleId * 1,
    orderNumber: administrativeOrder.orderNumber,
    orderDescription: administrativeOrder.orderDescription,
    orderYear: administrativeOrder.orderYear * 1,
    orderLevel: administrativeOrder.orderLevel * 1,
    orderDate: new Date(administrativeOrder.orderDate),
  };

  let condition = administrativeOrder.studentIds;
  let studentStatusId = administrativeOrder.studentStatusId;

  try {
    const updateAdministrativeOrder =
      await prismaInstance.administrativeOrder.updateMany({
        where: {
          AND: [
            {
              orderNumber: {
                equals: administrativeOrder.oldOrderNumber,
              },
            },
            {
              orderYear: {
                equals: administrativeOrder.oldOrderYear,
              },
            },
          ],
        },

        data: data,
      });
    if (condition) {
      const changeStudentStatus = await prismaInstance.student.updateMany({
        where: {
          idStudent: { in: condition },
        },
        data: {
          studentStatusId: studentStatusId,
        },
      });
      result(null, {
        AdministrativeOrderUpdated: updateAdministrativeOrder,
        studentStatus: changeStudentStatus,
      });
    } else {
      result(null, {
        AdministrativeOrderUpdated: updateAdministrativeOrder,
        studentStatus: "Not Found",
      });
    }
  } catch (error) {
    console.log(prismaErrorHandling(error));
    result(prismaErrorHandling(error), null);
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

AdministrativeOrder.removeAllByOrderNumber = async (
  orderNumber,
  orderYear,
  result
) => {
  try {
    const deleteAllAdministrativeOrders =
      await prismaInstance.administrativeOrder.deleteMany({
        where: {
          orderNumber: orderNumber,
          AND: {
            orderYear: orderYear,
          },
        },
      });
    result(null, deleteAllAdministrativeOrders);
  } catch (error) {
    console.log(prismaErrorHandling(error));
    result(prismaErrorHandling(error), null);
  }
};

AdministrativeOrder.count = async (result) => {
  try {
    const resulte = await prismaInstance.administrativeOrder.findMany({});
    if (resulte.length > 0) {
      result(null, resulte.length);
    }/* end of if */
  } catch (e) {
   result(prismaErrorHandling(e),null)
  }/* end of try catch */
}; /* end of count  */

module.exports = AdministrativeOrder;
