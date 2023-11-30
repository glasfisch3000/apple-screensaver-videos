const { log, err, childLogger } = require(__dirname + "/logging.js")(["app"])

log("importing modules")
const express = require("express")
const server = express()
const http = require("http").Server(server)
const port = 80

log("configuring http server")
server.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html")
})

log("starting http server")
http.listen(port, () => {
  log(`http server listening on port ${port}`)
})
