const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")
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

userSchema.post('save',(doc,next)=>{
  console.log('new doc created',doc)
  next()
})

userSchema.pre('save',async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)

  next()
})

const User = mongoose.model("user", userSchema);

module.exports = User;
