require("dotenv").config()
const express = require("express")
const router = require("./router")
const app = express()
const mongoose = require("mongoose")
const { auth } = require("express-oauth2-jwt-bearer")
const cors = require("cors")

const checkJwt = auth({
  audience: process.env.IDENTIFIER,
  issuerBaseURL: process.env.ISSUERBASEURL
})

app.use(cors())
app.use(express.json())
app.use("/api/v1", checkJwt, router)

app.use((err, req, res, next) => {
  if (err.status == 401) {
    return res.json({ status: err.status, message: "User not authenticated" })
  }
  next()
})

app.get("/", (req, res) => {
  res.json({ server: "ok" })
})

app.listen(process.env.PORT, process.env.HOSTNAME, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Database connected")
}).catch(err => console.log(err))

