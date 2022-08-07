import React from "react"
import { useState, useEffect } from "react"
import { Modal, Button } from "react-bootstrap"
import ReactTooltip from "react-tooltip"
import "../App.css"
import * as moment from 'moment'
import timeObj from './data.json'

let format="DD-MM-YYYY"


function Times(props) {
  const [event, setEvent] = useState(null)
  const [info, setInfo] = useState(false)
  const [value, setValue] = useState(false)
  const [message, setMessage] = useState("")
  const [slotIndex, setSlotIndex] = useState()
  const [currDate, setCurrDate] = useState(moment(props.date.toDateString()).format(format) )
  const isCookieEnabled = navigator.cookieEnabled;
  const handleChange = (event) => {
    setMessage(event.target.value)
  }

  const addReason = (index,date) => {
    timeObj[date][index].reason = message
    timeObj[date][index].isBooked = true
    timeObj[date][index].date = date.toDateString()
    setMessage("")
  }

  function displayInfo(e, value) {
    if (!value) {
      setInfo(true)
    } else {
      setInfo(false)
      
    }
    setEvent(e.target.innerText)
  }

  function modalOpen(indexValue) {
    if (value) {
      return (
        <Modal
          show={value}
          onHide={() => {
            setValue(false)
          }}
        >
          <Modal.Header>
            <Modal.Title>Enter Information</Modal.Title>
          </Modal.Header>
          <form>
            <Modal.Body>
              <h2>Enter the reason for the meeting</h2>
              <input
                type="text"
                placeholder="Enter the reason for the meeting"
                style={{ width: "100%" }}
                id="message"
                name="message"
                onChange={handleChange}
                value={message}
              ></input>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setValue(false)
                  addReason(indexValue,moment(props.date.toDateString()).format(format) )
                }}
              >
                Confirm Call
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      )
    }
  }

  return (
    <div className="times">
      {timeObj[moment(props.date.toDateString()).format(format)]?.map((times, index) => {
        return (
          <div className="slot_booking" key={index}>
            <button
              data-tip={times.isBooked ? "Slot already booked" : ""}
              className={times.isBooked ? "button-29 disabled " : "button-29"}
              onClick={(e) => {
                displayInfo(e, times.isBooked)
                setValue(!times.isBooked)
                setSlotIndex(index)
              }}
              // disabled={times.isBooked ? true : false}
            >
              {times.time}
            </button>
            <ReactTooltip />
            <span>{times.isBooked ? "Booked" : "Free Slot"}</span>
            <span>Reason: {!times.isBooked ? "" : times.reason}</span>
            {<div>{modalOpen(slotIndex)}</div>}
          </div>
        )
      })}
      <div>
        {info
          ? `Your appointment is set to ${event} ${props.date.toDateString()}`
          : null}
      </div>
    </div>
  )
}

export default Times
