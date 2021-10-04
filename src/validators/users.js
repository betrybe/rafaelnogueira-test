const { validateEmail } = require("./utils");

module.exports = {
  store(req, res, next) {
    let { name, email, password } = req.body;

    if (!name || !email || !password || !validateEmail(email))
      return res.status(400).send({
        message: "Invalid entries. Try again.",
      });

    return next();
  },
};
