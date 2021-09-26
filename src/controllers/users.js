const User = require("../model/User");

module.exports = {
  async store(req, res) {
    let { name, email, password } = req.body;

    let user = await User.findByEmail(email);

    if (user)
      return res.status(409).send({ message: "Email already registred" });

    user = await User.build({
      name,
      email,
      password,
      role: "user",
    });

    await user.insert();

    res.status(201).send({ user: user.getUser() });
  },
};
