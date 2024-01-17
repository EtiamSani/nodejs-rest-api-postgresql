const usersDatamapper = require("../model/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authController = {
  async registerUser(req, res) {
    const { email, username, password, role } = req.body;

    try {
      if (!email || !username || !role || !password) {
        return res.status(400).json({
          error: "Veuillez renseigner tous les champs",
        });
      }
      const existingUserWithSameEmail = await usersDatamapper.findByEmail(
        email
      );
      if (existingUserWithSameEmail) {
        return res.status(400).json({
          error: "Cet email est déjà utilisé",
        });
      }

      const passwordHashed = await bcrypt.hash(password, 10);

      const userInfo = {
        email,
        username,
        password: passwordHashed,
        role,
      };
      const createdUser = await usersDatamapper.create(userInfo);
      return res.status(201).json(createdUser);
    } catch (err) {
      console.error(err);
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      let user = await usersDatamapper.findByEmail(email);

      if (!user) {
        return res.status(400).json({
          error: "L'email ou le mot de passe n'est pas correct.",
        });
      }

      const passwordIsOk = await bcrypt.compare(password, user.password);

      if (!passwordIsOk) {
        return res.status(400).json({
          error: "L'email ou le mot de passe n'est pas correct.",
        });
      }

      delete user.password;
      const token = jwt.sign(
        {
          data: user,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      try {
        jwt.verify(token, process.env.SECRET_KEY);
      } catch (e) {
        return res.status(400).json({
          error: "L'authentification a échoué",
        });
      }

      return res.status(200).json({
        token,
      });
    } catch {
      return res.status(400).json({
        error: "Erreur lors de la connection",
      });
    }
  },
};

module.exports = authController;
