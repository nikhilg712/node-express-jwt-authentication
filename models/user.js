const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter the Email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail,'enter a valid email'],
  },
  password: {
    type: String,
    required: [true, "Please enter the Password"],
    minlength: [7, "Minimum password length is 7 charatcters"],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
