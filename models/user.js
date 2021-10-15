const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcript = require("bcryptjs");

const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      // match
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcript.hashSync(password, bcript.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcript.compareSync(password, this.password);
};

const joiSchema = Joi.object({
  email: Joi.string().required(), // pattern
  password: Joi.string().min(6).required(), // pattern
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSchema,
};
