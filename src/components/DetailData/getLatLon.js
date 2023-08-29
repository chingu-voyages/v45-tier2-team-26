export default function getLatLon(data) {
  return data.map((meteor) => {
    if(!meteor.reclong || !meteor.reclat){
        return null
    }
    return {
        lon: parseFloat(meteor.reclong),
        lat: parseFloat(meteor.reclat),
    }
  })
}
