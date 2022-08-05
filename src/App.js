import { useState } from "react"
import Calendar from "react-calendar"
import "./App.css"
import Time from "./Components/Time.js"

const tileDisabled = ({ activeStartDate, date, view }) => {
  return date <= new Date()
}

function App() {
  const [date, setDate] = useState(new Date())
  const [showTime, setShowTime] = useState(false)

  return (
    <>
    <h1 className="header">React Calendar</h1>
    <div className="app">
      <div className="calendar__main">
        <div>
          <Calendar
            onChange={setDate}
            value={date}
            onClickDay={() => setShowTime(true)}
            tileDisabled={tileDisabled}
          />
        </div>

        {date.length > 0 ? (
          <p>
            <span>Start:</span>
            {date[0].toDateString()}
            &nbsp; &nbsp;
            <span>End:</span>
            {date[1].toDateString()}
          </p>
        ) : (
          <p>
            <span>Default selected date:</span>
            {date.toDateString()}
          </p>
        )}
        </div>
      <Time showTime={showTime} date={date} />
    </div>
    </>
  )
}

export default App
