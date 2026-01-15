const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//tipo de dato, requerido y username unico
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hashear la contraseña antes de guardar
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //next() función que avisa a Mongoose que ya hemos terminado.
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
module.exports = mongoose.model("User", UserSchema);
