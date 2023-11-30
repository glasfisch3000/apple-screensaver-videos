const { log, err, childLogger } = require(__dirname + "/logging.js")(["app"])

log("importing modules")
const fs = require("fs").promises

const express = require("express")
const server = express()
const http = require("http").Server(server)
const port = 80

const { loadAllAssets } = require(__dirname + "/data.js")

log("configuring http server")
server.get("/", async (req, res) => {
  const assets = await loadAllAssets(childLogger)
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
})

log("starting http server")
http.listen(port, () => {
  log(`http server listening on port ${port}`)
})
