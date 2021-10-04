const User = require("../model/User");

module.exports = {
  async store(req, res) {
    let { name, email, password } = req.body;

    if (req.jwtUser.role !== "admin")
      return res
        .status(403)
        .send({ message: "Only admins can register new admins" });

    try {
      let user = await User.findByEmail(email);

      if (user)
        return res.status(409).send({ message: "Email already registered" });

      user = await User.build({
        name,
        email,
        password,
        role: "admin",
      });

      await user.insert();

      res.status(201).send({ user: user.getUser() });
    } catch (error) {
      res.status(500).send({ error: "Internal error" });
    }
  },
};
