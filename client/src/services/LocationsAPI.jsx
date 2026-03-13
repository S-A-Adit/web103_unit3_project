const getAllLocations = async () => {
  const response = await fetch('/api/locations')
  const data = await response.json()
  return data
}

const getLocationById = async (id) => {
  const data = await getAllLocations()
  return data.find(loc => loc.id === id)
}

const LocationsAPI = { getAllLocations, getLocationById }

export default LocationsAPI
