const express = require("express")
const server = express()
server.use(require("body-parser").urlencoded({ extended: false }))

const http = require("http").Server(server)
const port = 80

const client = require("./client.js")

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html")
})

http.listen(port, () => { console.log("[server] listening on port " + port) })
