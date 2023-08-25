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
              <td>{data.name}</td>
              <td>{data.id}</td>
              <td>{data.nametype}</td>
              <td>{data.recclass}</td>
              <td>{data.mass}</td>
              <td>{data.fall}</td>
              <td>{data.year}</td>
              <td>{data.reclat}</td>
              <td>{data.reclong}</td>
              <td>{data.geolocation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}

export default DetailData;