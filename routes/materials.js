const express = require("express")
const router = express.Router()
const Material = require("../models/Material")

router.get("/", (req, res) => {
  const { query } = req.query
  if (!!query) {
    Material.find().or([
      { color: query },
      ...(!isNaN(query) ? [{ material: query }] : []),
      ...(!isNaN(query) ? [{ ancho: query }] : []),
      ...(!isNaN(query) ? [{ espesor: query }] : []),
      ...(!isNaN(query) ? [{ alto: query }] : [])],
    )
      .then((materials) => {
        console.log(materials)
        if (materials) {
          res.json(materials)
        }
      })
  }
  else {
    Material.find({})
      .then(materials => {
        res.json(materials)
      })
  }
})

router.post("/", async (req, res) => {
  try {
    const { material, ancho, alto, espesor, color } = req.body
    const newMaterial = new Material({
      material,
      ancho,
      alto,
      espesor,
      color
    })
    const materialSaved = await newMaterial.save()
    res.json(materialSaved)
  } catch (error) {
    console.log(error)
    res.json("Fail to create material")
  }
})

router.delete("/:id", (req, res) => {
  const { id } = req.params
  Material.findByIdAndDelete(id).
    then(() => {
      res.sendStatus(200)
    }).catch(err => console.log(err))
})

router.patch("/:id", (req, res) => {
  const { id } = req.params
  const update = req.body
  Material.findByIdAndUpdate({ id }, update)
    .then((materialUpdated) => {
      res.json(materialUpdated)
    }).catch(err => console.log(err))
})

module.exports = router