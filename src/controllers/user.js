const { User, Transaction } = require("../../models");
const transaction = require("../../models/transaction");
const responSuccess = "Response Success";

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      },
    });

    if (!users) {
      return res.status(400).send({
        status: "Users Emptty",
        data: {
          users: [],
        },
      });
    }

    res.send({
      status: responSuccess,
      data: {
        users,
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

exports.getSingleUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      },
      include: {
        model: Transaction,
        as: "transactions",
        attributes: {
          exclude: ["userID", "createdAt", "updatedAt", "deletedAt", "UserId"],
        },
      },
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).send({
        status: `User With id: ${id} Not Found`,
        data: null,
      });
    }

    res.send({
      status: responSuccess,
      data: {
        user,
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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const getUserById = await User.findOne({
      where: {
        id,
      },
    });

    if (!getUserById) {
      return res.status(404).send({
        status: `User With id: ${id} Not Found`,
        data: null,
      });
    }

    await User.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: responSuccess,
      message: `User With id: ${id} Delete Success`,
      data: {
        user: null,
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

exports.restoreUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.restore({
      where: {
        id,
      },
    });

    res.send({
      status: responSuccess,
      message: `User With id: ${id} Restore Success`,
      data: {
        user,
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
