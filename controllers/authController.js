const User = require("../models/user");
const jwt = require("jsonwebtoken");
const handleErrors = (err) => {
  let error = { email: "", password: "" };
  console.log(err.message, err.code);
  if (err.code === 11000) {
    error.email = "Email already taken";
    return error;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
    return error;
  }
};

maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "nikhil secret", {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id)
    res.cookie('jwt',token,{httpOnly: true, maxAge:maxAge*1000})
    res.status(201).json({user : user._id});
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.login_post = async (req, res) => {
  const {email,password} = (req.body);
  try {
    const user = await User.login(email,password);
    res.status(200).json({user:user._id})
  } catch (err) {
    res.status(400).json({})
  }

};
