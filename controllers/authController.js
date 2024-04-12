const User = require("../models/user");

const handleErrors = (err) => {

  let error = {email : '', password : ''}  
  console.log(err.message, err.code);
  if(err.code===11000){
    error.email = "Email already taken"
    return error
  }
  if(err.message.includes("user validation failed")){
    Object.values(err.errors).forEach(({properties})=>{
        error[properties.path] = properties.message
    })
    return error
  }

};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({errors});
  }
};
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.login_post = (req, res) => {
  console.log(req.body);
  res.send("new login");
};
