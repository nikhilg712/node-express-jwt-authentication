const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { use } = require("../routes/authRoutes");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter the Email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter the Password"],
    minlength: [7, "Minimum password length is 7 charatcters"],
  },
});

userSchema.post("save", (doc, next) => {
  console.log("new doc created", doc);
  next();
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password,user.password)
    if(auth){
      return user
    }
    throw Error("incorrect password")
  }
  throw Error("incorrect mail");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
