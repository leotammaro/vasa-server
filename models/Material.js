const { Schema, model } = require("mongoose")

const materialSchema = new Schema({
  material: { type: Number, required: true },
  ancho: { type: Number, required: true },
  alto: { type: Number, required: true },
  espesor: { type: Number, required: true },
  color: { type: String, required: true }
})
const Material = model("Material", materialSchema)

module.exports = Material