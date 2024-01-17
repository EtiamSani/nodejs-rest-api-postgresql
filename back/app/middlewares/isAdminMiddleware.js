const jwt = require("jsonwebtoken");

const isAdminMiddleware = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "Token is wrong format" });
  }
  const token = authHeader.substring(7, authHeader.length);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Le token est invalide ou a expiré" });
    }
    if (user.data.role !== "admin") {
      return res.status(403).json({
        error:
          "Vous n'êtes pas autorisé à accéder à cette ressource car vous n'avez pas le rôle admin",
      });
    }

    req.user = user;
    next();
  });
};

module.exports = isAdminMiddleware;
