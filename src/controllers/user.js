const { User } = require("../../models");
const responSuccess = "Response Success";

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
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
        exclude: ["createdAt", "updatedAt"],
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

exports.addUser = async (req, res) => {
  try {
    const { body: userData } = req;

    const user = await User.create(userData);

    res.send({
      status: responSuccess,
      message: "User Succesfully Created",
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

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body: userData } = req;

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

    const user = await User.update(userData, {
      where: {
        id,
      },
    });

    const getUserAfterUpdate = await User.findOne({
      where: {
        id,
      },
    });

    res.send({
      status: responSuccess,
      message: "Update Success",
      data: {
        user: getUserAfterUpdate,
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
