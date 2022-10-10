const { Schema, model } = require("mongoose")

const userSchema = new Schema({
  nombre: { type: String, required: true },
  rol: { type: String, required: true },
  sector: { type: String, required: true },
  legajo: { type: Number, required: true },
  active: { type: Boolean, required: true }
})

const User = model("User", userSchema)

module.exports = User