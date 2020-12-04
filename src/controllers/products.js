const { Product } = require("../../models");
const responSuccess = "Response Success";
const Joi = require("joi");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });

    if (!products) {
      return res.status(400).send({
        status: "Products Emptty",
        data: {
          products: [],
        },
      });
    }

    res.send({
      status: responSuccess,
      data: {
        products,
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

exports.getSingleProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).send({
        status: `Product With id: ${id} Not Found`,
        data: null,
      });
    }

    res.send({
      status: responSuccess,
      data: {
        product,
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

exports.addProduct = async (req, res) => {
  try {
    const { body } = req;

    const schema = Joi.object({
      name: Joi.string().min(5).required(),
      price: Joi.number().min(6).required(),
      description: Joi.string().min(10).required(),
      stock: Joi.number(),
      photo: Joi.string(),
    });

    const { error } = schema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).send({
        status: "Validation Error",
        error: {
          message: error.details.map((error) => error.message),
        },
      });
    }

    const product = await Product.create(body);

    res.send({
      status: responSuccess,
      message: "Product Succesfully Created",
      data: {
        product,
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

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { body: productData } = req;

    const getProductById = await Product.findOne({
      where: {
        id,
      },
    });

    if (!getProductById) {
      return res.status(404).send({
        status: `Product With id: ${id} Not Found`,
        data: null,
      });
    }

    const product = await Product.update(productData, {
      where: {
        id,
      },
    });

    const getProductAfterUpdate = await Product.findOne({
      where: {
        id,
      },
    });

    res.send({
      status: responSuccess,
      message: "Update Success",
      data: {
        product: getProductAfterUpdate,
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

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const getProductById = await Product.findOne({
      where: {
        id,
      },
    });

    if (!getProductById) {
      return res.status(404).send({
        status: `Product With id: ${id} Not Found`,
        data: null,
      });
    }

    await Product.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: responSuccess,
      message: `Product With id: ${id} Deleted Success`,
      data: {
        product: null,
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

exports.restoreProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.restore({
      where: {
        id,
      },
    });

    res.send({
      status: responSuccess,
      message: `Product With id: ${id} Restore Success`,
      data: {
        product,
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
