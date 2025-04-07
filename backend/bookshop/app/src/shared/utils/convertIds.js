const { v4: uuidv4, parse, stringify } = require('uuid')

const uuidToBinary = (uuidStr) => {
  return Buffer.from(parse(uuidStr))
}

const binaryToUUID = (binary) => {
  console.log('Buffer:', binary)
  console.log('Buffer 길이:', binary.length)
  const uuidStr = stringify(binary)
  console.log('UUID:', uuidStr)
  return uuidStr
}

module.exports = { uuidToBinary, binaryToUUID }
