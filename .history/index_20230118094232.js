const express = require("express");
const app = express();
const { Joke } = require("./db");
const { Op } = require("Sequelize");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/jokes", async (req, res, next) => {
  console.log(req.query);
  const where = {};

  if (req.query.tags) {
    where.tags = { [Op.like]: `%${req.query.tags}%` };
  }

  if (req.query.content) {
    where.joke = { [Op.like]: `%${req.query.joke}%` };
  }

  const jokes = await Joke.findAll({ where });
  res.send(jokes);

  // try {
  //   if (Array.isArray(req.query.tags)) {
  //     jokes = await Joke.findAll({ where: { tags: req.query.tags } });
  //   } else if (req.query.tags) {
  //     jokes = await Joke.findAll({ where: { tags: req.query.tags } });
  //   } else {
  //     jokes = await Joke.findAll();
  //   }
  //   res.send(jokes);

  //   // TODO - filter the jokes by tags and content
  // } catch (error) {
  //   console.error(error);
  //   next(error);
  // }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
