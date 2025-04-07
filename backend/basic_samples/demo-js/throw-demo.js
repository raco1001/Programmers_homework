let string = '{ "age": 30}'
let syntaxError = new SyntaxError('Invalid JSON string')
let referenceError = new ReferenceError('Invalid JSON Reference')

try {
  let json = JSON.parse(string)
  console.log(json.name)

  if (!json.name) {
    throw referenceError
  }
} catch (error) {
  console.log(error)
  throw error
}
