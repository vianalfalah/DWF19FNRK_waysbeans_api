//import model post
const { Post } = require("../../models");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!posts) {
      return res.status(400).send({
        status: "Posts Emptty",
        data: [],
      });
    }

    res.send({
      status: "SUcces",
      data: {
        posts,
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
