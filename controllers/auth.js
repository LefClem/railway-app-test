const bcrypt = require("bcrypt");
const UserModels = require("../dao/auth.dao");
require("dotenv").config();

let userModels = new UserModels();

exports.signup = async (req, res) => {
  try {
    const user = {
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    };

    if (!user.name || !user.email || !user.password) {
      res.status(401).json({ message: "Veuillez remplir les champs !" });
    }

    let response = await userModels.signup(user, user.email);

    if (response.affectedRows == 1) {
      res.status(201).json({ message: "Utilisateur créé !" });
    } else {
      res.status(403).json({ message: "Email déjà utilisé !" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await userModels.login(req.body.email, req.body.password);
    res.status(200).json({ user });
  } catch (error) {
    switch (error.message) {
      case "Utilisateur introuvable !":
        res.status(404).json({ error });
        break;

      case "Paire identifiant/mot de passe incorrect":
        res.status(401).json({ error });
        break;
    }
  }
};

// exports.getOneUser = async (req, res) => {
//   try {
//     const user = await userModels.getOneUser(req.auth.id);
//     res.status(200).json({ user })
//   } catch (error) {
//     res.status(404).json({ error })
//   }
// }

// exports.updateProfilePicture = async (req, res) => {
//   try {
//     const picture = `${req.protocol}://${req.get('host')}/images/profile/${req.file.filename}`
//     const userImage = await userModels.updateProfilePicture(req.auth.id, picture);
//     res.status(200).json({ userImage})
//   } catch (error) {
//     res.status(400).json({ error })
//   }
// }
