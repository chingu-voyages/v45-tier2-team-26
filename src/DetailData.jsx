function DetailData {
    return (
        <div>
      <h1>Detail Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Name type</th>
            <th>RecClass</th>
            <th>Mass</th>
            <th>Fall</th>
            <th>Year</th>
            <th>ReClat</th>
            <th>ReClong</th>
            <th>Geolocation</th>
          </tr>
        </thead>
        <tbody>
          {jsonData.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.id}</td>
              <td>{item.nametype}</td>
              <td>{item.recclass}</td>
              <td>{item.mass}</td>
              <td>{item.fall}</td>
              <td>{item.year}</td>
              <td>{item.reclat}</td>
              <td>{item.reclong}</td>
              <td>{item.geolocation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}

export default DetailData;