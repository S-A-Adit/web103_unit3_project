import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import '../css/Events.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const eventsData = await EventsAPI.getAllEvents()
                setEvents(eventsData)

                const locationsData = await LocationsAPI.getAllLocations()
                setLocations(locationsData)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    const getLocationName = (locationId) => {
        const location = locations.find(loc => loc.id === locationId)
        return location ? location.name : 'Unknown Venue'
    }

    return (
        <div className='all-events'>
            <h2>All Events</h2>
            {events && events.length > 0 ? (
                <div className='all-events-grid'>
                    {events.map((event) => (
                        <div key={event.id} className='event-with-venue'>
                            <p className='event-venue-label'>{getLocationName(event.location_id)}</p>
                            <Event
                                title={event.title}
                                date={event.date}
                                description={event.description}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <h3><i className="fa-regular fa-calendar-xmark fa-shake"></i> No events scheduled yet!</h3>
            )}
        </div>
    )
}

export default Events
