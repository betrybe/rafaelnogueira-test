const { validateEmail } = require("./utils");

module.exports = {
  store(req, res, next) {
    let { name, ingredients, preparation } = req.body;

    if (!name || !ingredients || !preparation)
      return res.status(400).send({
        message: "Invalid entries. Try again",
      });

    return next();
  },
};
