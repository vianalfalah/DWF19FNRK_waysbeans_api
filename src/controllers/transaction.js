const { User, Transaction, Product } = require("../../models");
const responSuccess = "Response Success";

exports.getTransactions = async (req, res) => {
  try {
    const trans = await Transaction.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: Product,
          as: "products",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    if (!trans) {
      return res.status(400).send({
        status: "Users Emptty",
        data: {
          trans,
        },
      });
    }

    res.send({
      status: responSuccess,
      data: {
        trans,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.getSingleTranById = async (req, res) => {
  try {
    const { id } = req.params;

    const tran = await Transaction.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });

    if (!tran) {
      return res.status(404).send({
        status: `User With id: ${id} Not Found`,
        data: null,
      });
    }

    res.send({
      status: responSuccess,
      data: {
        tran,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.addTran = async (req, res) => {
  try {
    const { body } = req;

    const tran = await Transaction.create(body);

    res.send({
      status: responSuccess,
      message: "User Succesfully Created",
      data: {
        tran,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.updateTran = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const getTranById = await Transaction.findOne({
      where: {
        id,
      },
    });

    if (!getTranById) {
      return res.status(404).send({
        status: `User With id: ${id} Not Found`,
        data: null,
      });
    }

    const tran = await Transaction.update(body, {
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    const getTranAfterUpdate = await Transaction.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.send({
      status: responSuccess,
      message: "Update Success",
      data: {
        tran: getTranAfterUpdate,
      },
    });
  } catch (error) {
    //error here
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.deleteTran = async (req, res) => {
  try {
    const { id } = req.params;

    const getTranById = await Transaction.findOne({
      where: {
        id,
      },
    });

    if (!getTranById) {
      return res.status(404).send({
        status: `User With id: ${id} Not Found`,
        data: null,
      });
    }

    await Transaction.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: responSuccess,
      message: `User With id: ${id} Delete Success`,
      data: {
        tran: null,
      },
    });
  } catch (error) {
    //error here
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.restoreTran = async (req, res) => {
  try {
    const { id } = req.params;

    const tran = await Transaction.restore({
      where: {
        id,
      },
    });

    res.send({
      status: responSuccess,
      message: `User With id: ${id} Restore Success`,
      data: {
        tran,
      },
    });
  } catch (error) {
    //error here
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

//template
exports.function = async (req, res) => {
  try {
    //code here
  } catch (error) {
    //error here
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};
