const MapTest = () => {
  const fruits = ['apple', 'banana', 'orange']
  return (
    <div>
      <h2>Fruits</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  )
}

export default MapTest
