const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  console.log("ioioioi")

  if (!authorization) return res.status(401).send({ message: "missing auth token" });

  try {
    const payload = jwt.verify(authorization, global.tokenKey);

    req.jwtUser = payload;

    return next();
  } catch (error) {
    res.status(401).send({ message: "jwt malformed" });
  }
};
