import React, { useState, useEffect } from "react";
import "@fullcalendar/core/vdom";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import dom from "@left4code/tw-starter/dist/js/dom";
import FullCalendar from "@/base-components/calendar/Main";
import { format, differenceInHours } from "date-fns";
import { hours } from './hours'
import { updateDropedCall } from '../../services/api/calls/calls'
import { updateDropedTask } from '../../services/api/tasks/tasks'
import { getAllCustomers } from '../../services/api/customers/customers'
import { updateDropedMeeting } from '../../services/api/meetings/meetings'
import { getUsers } from '../../services/api/users/users'
import { LoadingIcon } from "@/base-components";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Litepicker,
} from "@/base-components";


function Main({ event, type, handleSubmit, form, setForm, closing, loading, handleEdit }) {
  const [date, setDate] = useState()
  const [formatDate, setFormatDate] = useState()
  const [startingAt, setStartingAt] = useState(null)
  const [endingAt, setEndingAt] = useState(null)
  const [modalShow, setModalShow] = useState(false);
  const [modalCreatedShow, setModalCreatedShow] = useState(false);
  const [allUsers, setAllUsers] = useState(null);
  const [allCustomers, setAllCustomers] = useState(null);
  const [checkAllDay, setCheckAllDay] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [currentInfo, setCurrentInfo] = useState({
    title: "",
    date: "",
    allDay: "",
    startingAt: "",
    endingAt: "",
    description: "",
    taskOwner: "-",
    customer: "-",
  });

  // calendar management
  const handleDateClick = (info) => {
    setIsEdit(false)
    var dateTemp = new Date(info.dateStr)
    setDate(format(dateTemp, "d MMM, yyy"));
    setModalShow(true)
  }

  const mainFetch = async () => {
    const resUsers = await getUsers();
    const resCustomers = await getAllCustomers();

    setAllUsers(resUsers);
    setAllCustomers(resCustomers);
  }

  useEffect(() => {
    mainFetch();
  }, [])

  useEffect(() => {
    setModalShow(false)
  }, [closing])

  const handleEventClick = (info) => {
    const path = info.event._def
    setCurrentInfo({
      ...currentInfo,
      id: path.publicId,
      title: path.title,
      date: format(new Date(info.el.fcSeg.eventRange.range.start), "dd LLL, yyy"),
      allDay: path.allDay,
      startingAt: path.allDay == 1 ? null : path.extendedProps.startingAt,
      endingAt: path.allDay == 1 ? null : path.extendedProps.endingAt,
      description: path.extendedProps.description,
      taskOwner: `${path.extendedProps.owner_id}`,
      customer: `${path.extendedProps.customer_id}`,
    })
    setModalCreatedShow(true)
  }

  useEffect(() => {
    var newDate = new Date(date)
    if (!checkAllDay || checkAllDay == false) {
      setForm({ ...form, allDay: 0 })
    } else {
      setForm({ ...form, allDay: 1, date: `${format(newDate, "yyy-LL-dd")}` })
    }

  }, [checkAllDay])

  const handleChangeStartingAt = (e) => {
    var newDate = new Date(date)
    var flagVerif = false
    setStartingAt(e)
    if (!endingAt) {
      flagVerif = true
      setEndingAt(Number(e) + 1)
    }
    if (flagVerif == true) {
      setForm({ ...form, startingAt: `${format(newDate, "yyy-LL-dd")}T${hours[e].label}:00`, endingAt: `${format(newDate, "yyy-LL-dd")}T${hours[Number(e) + 1].label}:00` })
    } else {
      setForm({ ...form, startingAt: `${format(newDate, "yyy-LL-dd")}T${hours[e].label}:00` })
    }
  }
  const handleChangeEndingAt = (e) => {
    var newDate = new Date(date)
    var flagVerif = false
    setEndingAt(e)
    if (!startingAt) {
      flagVerif = true
      setEndingAt(Number(e) - 1)
    }
    if (flagVerif == true) {
      setForm({ ...form, endingAt: `${format(newDate, "yyy-LL-dd")}T${hours[e].label}:00`, startingAt: `${format(newDate, "yyy-LL-dd")}T${hours[Number(e) - 1].label}:00` })
    } else {

      setForm({ ...form, endingAt: `${format(newDate, "yyy-LL-dd")}T${hours[e].label}:00` })
    }
  }

  useEffect(() => {

    if (date) {
      var formatedDate = format(new Date(date), "yyy-LL-dd")
      setForm({ ...form, date: formatedDate })
    }

  }, [date])


  const handleActiveEdit = (currentInfo, edit = false) => {
    if (currentInfo.allDay == false) {

      var startingAtSpliced = currentInfo.startingAt.slice(11, 16)
      var startingAtArr = hours.filter(h => h.label == startingAtSpliced)
      setStartingAt(currentInfo.startingAt)
      var endingAtSpliced = currentInfo.endingAt.slice(11, 16)
      var endingAtArr = hours.filter(h => h.label == endingAtSpliced)
      setEndingAt(currentInfo.endingAt)
    }
    setForm({ ...form, id: currentInfo.id, title: currentInfo.title, description: currentInfo.description, taskOwner: currentInfo.taskOwner, customer: currentInfo.customer, allDay: currentInfo.allDay == true ? true : false })
    setCheckAllDay(currentInfo.allDay == true ? 1 : 0)
    setDate(currentInfo.date)
    setModalCreatedShow(false)
    setIsEdit(true)
    setModalShow(true)

  }

  useEffect(() => {
    if (startingAt) {
      setForm({ ...form, startingAt: startingAt, endingAt: endingAt })
    }

  }, [startingAt, endingAt])

  const handleEventDrop = async (info) => {
    var id = info.event._def.publicId
    var newDate = info.event._instance.range.start
    var newDateParsed = format(newDate, "yyy-LL-dd")
    if (type == "task") {
      await updateDropedTask(id, newDateParsed)
    }
    if (type == "meeting") {
      await updateDropedMeeting(id, newDateParsed)
    }
    if (type == "call") {
      await updateDropedCall(id, newDateParsed)
    }
  }



  const options = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    droppable: true,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    navLinks: true,
    editable: true,
    dayMaxEvents: true,
    events: event,
    drop: function (info) {
      if (
        dom("#checkbox-events").length &&
        dom("#checkbox-events")[0].checked
      ) {
        dom(info.draggedEl).parent().remove();

        if (dom("#calendar-events").children().length == 1) {
          dom("#calendar-no-events").removeClass("hidden");
        }
      }
    },
    dateClick: handleDateClick,
    eventClick: handleEventClick,
    eventDrop: handleEventDrop,
  };

  return <>
    {/* {type == "task" && ( */}
    <>
      <Modal
        show={modalShow}
        onHidden={() => {
          setModalShow(false);
        }}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">
            Add a new task
          </h2>
        </ModalHeader>
        <form onSubmit={isEdit ? handleEdit : handleSubmit}>
          <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12 sm:col-span-12">
              <label htmlFor="date-task" className="form-label">
                Date
              </label>
              <Litepicker
                id="date-task"
                value={date}
                onChange={setDate}
                options={{
                  autoApply: false,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }}
                className="form-control  block mx-auto"
              />
            </div>
            <div className="col-span-12 sm:col-span-12">
              <input type="checkbox" id="checkAllDay" checked={checkAllDay} className="form-check-input mr-4" onChange={e => setCheckAllDay(!checkAllDay)} />
              <label htmlFor="checkAllDay" className="form-label">
                All day
              </label>
            </div>

            {checkAllDay == false && (<>
              <div className="col-span-12 sm:col-span-6">
                <label htmlFor="starting-task" className="form-label">
                  Starting at
                </label>
                <select id="starting-task" className="form-select" value={startingAt} onChange={(e) => handleChangeStartingAt(e.target.value)}>
                  {startingAt == null && (
                    <option value="-">Please choose an hour</option>
                  )}
                  {hours.map((hour) => {
                    if (endingAt && endingAt <= hour.value) {
                      return
                    } else {

                      return (
                        <option key={hour.value} value={hour.value}>{hour.label}</option>
                      )
                    }
                  })}
                </select>
              </div>
              {startingAt && (<>
                <div className="col-span-12 sm:col-span-6">
                  <label htmlFor="ending-task" className="form-label">
                    Ending at
                  </label>
                  <select id="ending-task" className="form-select" value={endingAt} onChange={(e) => handleChangeEndingAt(e.target.value)}>
                    {hours.map((hour) => {
                      if (startingAt && startingAt >= hour.value) {
                        return
                      } else if (startingAt && startingAt < hour.value) {
                        var dateLeft = (Number(hour.label.slice(0, 2)) * 60) + Number(hour.label.slice(3, 5))
                        var dateRight = (Number(hours[startingAt].label.slice(0, 2)) * 60) + Number(hours[startingAt].label.slice(3, 5))

                        var diff = dateLeft - dateRight
                        var diffHours = Math.floor(diff / 60)
                        var diffMinutes = diff % 60
                        var finalDiff = ""

                        if (diffHours == 0) {
                          finalDiff = `${diffMinutes}mn`
                        } else if (diffHours != 0 && diffMinutes == 0) {
                          finalDiff = `${diffHours}h`
                        } else {
                          finalDiff = `${diffHours}h${diffMinutes}`
                        }

                        return (
                          <option key={hour.value} value={hour.value}>{hour.label} ({finalDiff})</option>
                        )
                      } else {
                        return (
                          <option key={hour.value} value={hour.value}>{hour.label}</option>
                        )
                      }
                    })}
                  </select>
                </div>
              </>)}
            </>)}
            <div className="col-span-12 sm:col-span-12">
              <label htmlFor="title-task" className="form-label">
                Title
              </label>
              <input
                id="title-task"
                type="text"
                className="form-control"
                placeholder="Send a mail to..."
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="col-span-12 sm:col-span-12">
              <label htmlFor="description-task" className="form-label">
                Description
              </label>
              <textarea
                id="description-task"
                type="text"
                className="form-control"
                placeholder="Describe it..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              ></textarea>
            </div>
            <div className="col-span-12 sm:col-span-12">
              <label htmlFor="description-task" className="form-label">
                Task owner
              </label>
              <select className="form-control"
                onChange={(e) => setForm({ ...form, taskOwner: e.target.value })} value={form.taskOwner}>
                <option value="-">Please choose an owner</option>
                {allUsers && allUsers.map((user) => {
                  return (
                    <option value={user.id} key={user.id}>{`${user.first_name} ${user.last_name}`}</option>
                  )
                })}
              </select>
            </div>
            <div className="col-span-12 sm:col-span-12" >
              <label htmlFor="description-task" className="form-label">
                Customer
              </label>
              <select className="form-control" onChange={(e) => setForm({ ...form, customer: e.target.value })} value={form.customer}>
                <option value="-">Please choose a customer</option>
                {allCustomers && allCustomers.map((customer) => {
                  return (
                    <option value={customer.id} key={customer.id}>{customer.name}</option>
                  )
                })}
              </select>
            </div>
          </ModalBody>
          <ModalFooter>
            {loading ?
              <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                <LoadingIcon icon="puff" className="w-8 h-8" />
              </div>
              : <>
                <button
                  type="button"
                  onClick={() => {
                    setModalShow(false);
                  }}
                  className="btn btn-outline-secondary w-20 mr-1"
                >
                  Cancel
                </button>
                <button type="sumbit" className="btn btn-primary w-20">
                  {isEdit ? "Update" : "Add"}
                </button>
              </>}
          </ModalFooter>
        </form>
      </Modal>
      <Modal
        show={modalCreatedShow}
        onHidden={() => {
          setModalCreatedShow(false);
        }}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto uppercase">
            {currentInfo.title}
          </h2>
        </ModalHeader>
        <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
          <div className="col-span-12 sm:col-span-12">
            <label htmlFor="date-task" className="form-label">
              Date
            </label>
            <input type="text" className="form-control" disabled value={currentInfo.date} />
          </div>
          {currentInfo.allDay == 1 ? (
            <div className="col-span-12 sm:col-span-12">
              <input type="checkbox" checked id="checkAllDay" disabled className="form-check-input mr-4" />
              <label htmlFor="checkAllDay" className="form-label">
                All day
              </label>
            </div>
          ) : (
            <>
              <div className="col-span-12 sm:col-span-6">
                <label htmlFor="starting-task" className="form-label">
                  Starting at
                </label>
                {hours && currentInfo && currentInfo.startingAt && (
                  <input type="text" className="form-control" disabled value={hours[currentInfo.startingAt].label} />
                )}
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label htmlFor="ending-task" className="form-label">
                  Ending at
                </label>
                {hours && currentInfo && currentInfo.endingAt && (
                  <input type="text" className="form-control" disabled
                    value={hours[currentInfo.endingAt].label} />
                )}
              </div>
            </>
          )}


          <div className="col-span-12 sm:col-span-12">
            <label htmlFor="title-task" className="form-label">
              Title
            </label>
            <input
              id="title-task"
              type="text"
              className="form-control"
              placeholder="Send a mail to..."
              value={currentInfo.title}
              disabled
            />
          </div>
          <div className="col-span-12 sm:col-span-12">
            <label htmlFor="description-task" className="form-label">
              Description
            </label>
            <textarea
              id="description-task"
              type="text"
              className="form-control"
              placeholder="Describe it..."
              value={currentInfo.description}
              disabled
            ></textarea>
          </div>
          <div className="col-span-12 sm:col-span-12">
            <label htmlFor="description-task" className="form-label">
              Task owner
            </label>
            <select className="form-control"
              value={currentInfo.taskOwner}
              disabled>
              {allUsers && allUsers.map((user) => {
                return (
                  <option value={user.id} key={user.id}>{`${user.first_name} ${user.last_name}`}</option>
                )
              })}
            </select>
          </div>
          <div className="col-span-12 sm:col-span-12" onChange={(e) => setForm({ ...form, customer: e.target.value })}>
            <label htmlFor="description-task" className="form-label">
              Customer
            </label>
            <select className="form-control" value={Number(currentInfo.customer)}
              disabled>

              {allCustomers && allCustomers.map((customer) => {
                return (
                  <option value={customer.id} key={customer.id}>{customer.name}</option>
                )
              })}
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          {loading ?
            <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
              <LoadingIcon icon="puff" className="w-8 h-8" />
            </div>
            : <>
              <button
                type="button"
                onClick={() => {
                  setModalCreatedShow(false);
                }}
                className="btn btn-outline-secondary w-20 mr-1"
              >
                Cancel
              </button>
              <button type="sumbit" className="btn btn-primary w-20" onClick={() => handleActiveEdit(currentInfo, true)}>
                Edit
              </button>
            </>}
        </ModalFooter>
      </Modal>
    </>
    {/* // )} */}
    <FullCalendar options={options} />
  </>
}

export default Main;
