const fs = require("fs").promises

module.exports.loadAllAssets = async (logger) => {
  const { log, err, childLogger } = logger("loadAllAssets")

  try {
    log("loading assets file")
    const file = await fs.readFile(__dirname + "/data/entries.json")
    const entries = JSON.parse(file)

    const assets = entries.assets
    const results = []
    for(const asset of assets) {
      const id = asset.shotID
      const thumbnail = asset.previewImage
      const name = asset.accessibilityLabel
      const url = asset["url-4K-SDR-240FPS"] || asset["url-4K-SDR-120FPS"]

      results.push({ id: id, thumbnail: thumbnail, name: name, url: url })
    }

    return results
  } catch(error) {
    err(error)
    return false
  }
}
