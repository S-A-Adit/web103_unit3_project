const getAllEvents = async () => {
  const response = await fetch('/api/events')
  const data = await response.json()
  return data
}

const getEventsByLocationId = async (locationId) => {
  const data = await getAllEvents()
  return data.filter(event => event.location_id === locationId)
}

const EventsAPI = { getAllEvents, getEventsByLocationId }

export default EventsAPI
