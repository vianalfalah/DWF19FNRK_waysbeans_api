const { User, Transaction, Product, TranToProd } = require("../../models");
const responSuccess = "Response Success";
const Joi = require("joi");

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "UserId"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["fullName", "email"],
        },
        {
          model: Product,
          as: "products",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          through: {
            attributes: [["orderQuantity", "qty"]],
            as: "orderQuantity",
          },
        },
      ],
    });

    if (!transactions) {
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
        transactions,
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
        {
          model: Product,
          as: "products",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          through: {
            model: TranToProd,
            as: "information",
            attributes: ["orderQuantity"],
          },
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
    const { body } = req.body;
    const schema = Joi.object({
      name: Joi.string().min(2).required(),
      email: Joi.string().email().min(10).required(),
      phone: Joi.number().required(),
      address: Joi.string().min(5).required(),
      products: Joi.required(),
      attachment: Joi.required(),
    });
    const { error } = schema.validate(body, {
      abortEarly: false,
    });

    const { id: userID } = req.user;
    const tran = await Transaction.create({
      ...req.body,
      attachment: req.file.filename,
    });

    if (tran) {
      const transactionResult = await Transaction.findOne({
        where: {
          id: transaction.id,
        },
        include: {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.send({
        status: responSuccess,
        message: "User Succesfully Created",
        data: transactionResult,
      });
    }
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
