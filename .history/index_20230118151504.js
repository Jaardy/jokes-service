const express = require("express");
const app = express();
const { Joke, Sequelize } = require("./db");
const { Op } = Sequelize;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/jokes", async (req, res, next) => {
  try {
    const where = {};

    if (req.query.tags) {
      where.tags = { [Op.like]: `%${req.query.tags}%` }; // search within the string, not only exact matches
    }

    if (req.query.content) {
      where.joke = { [Op.like]: `%${req.query.content}%` }; // search within the string, not only exact matches
    }

    const jokes = await Joke.findAll({
      where,
    });

    res.send(jokes);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
