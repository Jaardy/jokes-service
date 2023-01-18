const express = require("express");
const app = express();
const { Joke } = require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/jokes", async (req, res, next) => {
  console.log(req.query);
  let jokes = [];
  try {
    if (req.query) {
      jokes = await Joke.findAll({ where: { tags: req.query.tags } });
      res.status(200).send(jokes);
    }

    // TODO - filter the jokes by tags and content

    res.send(jokes);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
