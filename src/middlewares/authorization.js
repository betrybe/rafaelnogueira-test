const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send({ message: "missing auth token" });

  const [Bearer, token] = authorization.split(" ");

  if (!token) return res.status(401).send({ message: "jwt malformed" });

  try {
    const payload = jwt.verify(token, global.tokenKey);

    req.jwtUser = payload;

    return next();
  } catch (error) {
    res.status(401).send({ error: "Token inválido" });
  }
};
