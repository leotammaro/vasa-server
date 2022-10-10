const express = require("express")
const router = express.Router()
const User = require("../models/User")

router.get("/", async (req, res) => {
  const { data } = req.query
  if (data) {
    const usersFiltered = await User.find({}).or([
      { nombre: data },
      { rol: data },
      ...(!isNaN(data) ? [{ legajo: data }] : []),
      { sector: data }
    ])
    res.json(usersFiltered)
  } else {
    const usersFound = await User.find({})
    res.json(usersFound)
  }

})

router.post("/", async (req, res) => {
  try {
    const { nombre, rol, sector, legajo, active } = req.body
    const newUser = new User({
      nombre,
      rol,
      legajo,
      sector,
      active
    })
    const userSaved = await newUser.save()
    res.json(userSaved)

  } catch (error) {
    console.log(error)
    res.json({ message: "New user creation failed" })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const userDeleted = await User.findByIdAndDelete(id)
    console.log(userDeleted)
    if (userDeleted) {
      res.json({ status: 200, message: "User deleted" })
    } else {
      res.json({ status: 400, message: "User not found" })
    }
  } catch (error) {
    res.sendStatus(500)
  }
})


module.exports = router