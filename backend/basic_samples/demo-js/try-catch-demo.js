let string = '{"name": "John", "age": 30}'

try {
  let json = JSON.parse(string)
  console.log(json)
} catch (error) {
  console.log(error)
}
