const JWT = require("jsonwebtoken");
const User = require("../../models/user/auth");
const { JWT_SECRET } = require("../../config");
signToken = user => {
  return JWT.sign(
    {
      iss: "Coder",
      sub: user._id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    JWT_SECRET
  );
};
module.exports = {
  // SIGN UP
  signup: async (req, res, next) => {
    const { email, password, companyname, userid } = req.value.body;
    //check if there is a user with the same email
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res.status(403).send({ error: "email is already in use" });
    }
    const newUser = new User({ email, password, companyname, userid });
    await newUser.save();
    const token = signToken(newUser);

    res.status(200).json({ token });
  },

  // SIGN IN
  signin: async (req, res, next) => {
    //console.log('req.user:',req.user);
    const token = signToken(req.user);

    res.status(200).json({ token: token, Status: "Login Successful" });
  }
};
