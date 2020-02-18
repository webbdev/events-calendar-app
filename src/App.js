import React, { Component } from 'react'
import moment from 'moment'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      isModalVisible: {},
      date: '',
      hours: [ "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM" ],
      events: [
        {
          id: 1,
          start: 30,
          end: 90,
          title: "IT Team Meeting",
          time: "9:30 - 10:30 am",
          address: "London, UK"
        },
        {
          id: 2,
          start: 120,
          end: 180,
          title: "Meeting with Boss",
          time: "11 - 12pm",
          address: "London, UK"
        },
        {
          id: 3,
          start: 240,
          end: 300,
          title: "Lunch",
          time: "1 - 2pm",
          address: "London, UK",
          width: 1/2
        },
        {
          id: 4,
          start: 270,
          end: 300,
          title: "Coffee",
          time: "1:30 - 2pm",
          address: "London, UK",
          width: 1/2,
          left: 47
        },
        {
          id: 5,
          start: 360,
          end: 480,
          title: "Training",
          time: "3 - 5pm",
          address: "London, UK"
        },
        {
          id: 6,
          start: 510,
          end: 540,
          title: "Birthday Celebration",
          time: "5:30 - 6pm",
          address: "London, UK"
        }
      ]
    }
  }

  // Add event listener
  componentDidMount() {
    window.addEventListener('resize', this.windowSizeChange)
    this.getDate()
  }

  getDate = () => {
    let date = new Date()
    let formatdate = moment(date).format("dddd, MMM Do YYYY")
    this.setState({ formatdate })
  }

  // Remove event listener
  componentWillUnmount() {
    window.removeEventListener('resize', this.windowSizeChange)
  }

  windowSizeChange = () => {
    this.setState({ width: window.innerWidth })
  }

  showModal(id) {
    this.setState({
      isModalVisible: {     
        ...this.state.isModalVisible,
        [id]: true
      }
    })
  }

  onCloseModal = (event) => {
    event.preventDefault()
    this.setState({ 
      isModalVisible: {     
        isModalVisible: false
      }
    })
  }

  render() {
    const { formatdate, hours, events, width, isModalVisible } = this.state
    const isMobile = width <= 767;

    return (
      <div className="wrapper">
        <h2>One Day Calendar Events</h2>
        <div className="wr-row">

          <div className="schedule-table">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th><span className="date">{ formatdate }</span></th>
                </tr>
              </thead>
              <tbody>
                {hours.map((hour, index) =>
                  <tr key={index}>
                    <td><span className="td-hours">{hour}</span></td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="events-container">
              {events.map((event) => 
                <div key={event.id}>
                  <div
                    className="event-block" 
                    style={{ marginTop: `${(event.start)/30*20}px`, height: `${(event.end - event.start)/30*20}px`, width: isMobile ? `${94*event.width}%` : `${98*event.width}%`, left: isMobile ? `${event.left}%` : `${event.left+2}%` }}
                    onClick={() => this.showModal(event.id)}
                  >
                    <span className="event-title">{event.title}</span>
                    <span className="event-time">{event.time}</span>
                  </div>
                  { isModalVisible[event.id] &&
                    <div className="modal-box" onClick={this.onCloseModal}>
                      <div className="modal-content">
                        <span title="Close" onClick={this.onCloseModal} className="close-btn">&times;</span>
                        <h3 className="modal-event-title">{event.title}</h3>
                        <p className="modal-event-time">{event.time}</p>
                        <p className="modal-event-address">{event.address}</p>
                        <div className="more-info">
                          <p>Some text, some text.</p>
                          <p>Some text, some text.</p>
                          <p>Some text, some text.</p>
                        </div>  
                      </div>
                    </div>
                  }
                </div>
              )}
            </div>{/* End .events-container */}
            
          </div>{/* End .schedule-table */}

        </div>
      </div>
    )
  }
}