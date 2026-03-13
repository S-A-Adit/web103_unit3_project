import '../css/Event.css'

const Event = ({ title, date, description }) => {
    return (
        <article className='event-information'>
            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {date}</p>
                    <p>{description}</p>
                </div>
            </div>
        </article>
    )
}

export default Event
