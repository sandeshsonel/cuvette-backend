const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
  },
  photo: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    // minLength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same.",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  console.log({ candidatePassword, userPassword });
  const compare = await bcrypt.compare(candidatePassword, userPassword);
  console.log({ compare });
  return compare;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
