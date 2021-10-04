const jwt = require("jsonwebtoken");
const User = require("../model/User");

module.exports = {
  async store(req, res) {
    let { email, password } = req.body;

    try {
      let user = await User.findByEmail(email);

      if (!user || user.password !== password)
        return res
          .status(401)
          .send({ message: "Incorrect username or password" });

      const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          role: user.role,
        },
        global.tokenKey
      );

      res.status(200).send({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal error" });
    }
  },
};
