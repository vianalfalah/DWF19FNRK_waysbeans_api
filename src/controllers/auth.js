const { User } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//   try {
//     const schema = Joi.object({
//       fullName: Joi.string().min(5).required(),
//       email: Joi.string().email().min(8).required(),
//       password: Joi.string().min(8).required(),
//     });

//     const { error } = schema.validate(req.body, {
//       abortEarly: false,
//     });

//     if (error) {
//       return res.status(400).send({
//         status: "Validation Error",
//         error: {
//           message: error.details.map((error) => error.message),
//         },
//       });
//     }

//     const { email, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 8);

//     const user = await User.create({ ...req.body, password: hashedPassword });

//     const token = jwt.sign({ id: user.id }, "vian-alfalah");

//     res.send({
//       status: "Register Success",
//       data: {
//         email,
//         token,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.login = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().min(8).required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details.map((error) => error.message),
        },
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).send({
        message: "Invalid Login",
      });
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return res.status(400).send({
        message: "Invalid Login",
      });
    }

    const token = jwt.sign({ id: user.id }, "vian-alfalah");

    res.send({
      status: "Login Success",
      data: {
        email,
        token,
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

exports.auth = async (req, res, next) => {
  let header, token;

  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  )
    return res.status(401).send({
      message: "Access Denied",
    });
  try {
    const verified = jwt.verify(token, "vian-alfalah");
    req.user = verified;
    next();
  } catch (error) {
    //error here
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Invalid Token",
      },
    });
  }
};
