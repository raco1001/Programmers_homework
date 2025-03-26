const { parse } = require('uuid')
const toBinaryUUID = (uuid) => {
  return Buffer.from(parse(uuid))
}

module.exports = { toBinaryUUID }
