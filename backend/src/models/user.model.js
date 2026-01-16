const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//tipo de dato, requerido y username unico
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hashear la contraseña antes de guardar
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
module.exports = mongoose.model("User", UserSchema);
