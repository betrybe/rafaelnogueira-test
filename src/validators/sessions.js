const { validateEmail } = require("./utils");

module.exports = {
  store(req, res, next) {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(401).send({
        message: "All fields must be filled",
      });

    return next();
  },
};
