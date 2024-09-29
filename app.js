const { log, err, childLogger } = require(__dirname + "/logging.js")(["app"])

log("importing modules")
const fs = require("fs").promises

const sessionID = require(__dirname + "/sessionid.js")

const express = require("express")()
const http = require("http").Server(express)

const port = parseInt(process.env["APPLE_SCREENSAVER_VIDEOS_PORT"] || 1618)

const { loadAllAssets } = require(__dirname + "/data.js")

log("configuring http server")

const server = childLogger("server")
express.get("/", async (req, res) => {
  const session = server.childLogger("session-" + sessionID())
  session.log("http get request: /")

  try {
    const assets = await loadAllAssets(session.childLogger)
    const blocks = assets.map(asset =>
      `<a class="asset-link" href="${asset.url}">\n` +
      `  <div class="asset-container">\n` +
      `    <img src="${asset.thumbnail}" class="asset-thumbnail"></img>\n` +
      `    <div class="asset-name">${asset.name}</div>\n` +
      `    <div class="asset-id">${asset.id}</div>\n` +
      `  </div>\n` +
      `</a>`
    ).join("\n")

    let file = new String(await fs.readFile(__dirname + "/client/index.html"))
    file = file.replace("<!--$content-->", blocks)

    res.send(file)
  } catch(error) {
    session.err(error)
  }
})

express.get("/style", (req, res) => {
  const session = server.childLogger("session-" + sessionID())
  session.log("http get request: /style")

  try {
    res.sendFile(__dirname + "/client/main.css")
  } catch(error) {
    session.err(error)
  }
})

log("starting http server")
http.listen(port, () => {
  server.log(`http server listening on port ${port}`)
})
