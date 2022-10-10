const express = require("express");
const router = express.Router()
const materials = require("./routes/materials")
const users = require("./routes/users")


router.use("/materials", materials)
router.use("/users", users)

module.exports = router