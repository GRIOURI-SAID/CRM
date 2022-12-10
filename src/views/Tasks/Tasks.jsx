import React, { useState, useRef, useEffect } from 'react'
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
} from "@/base-components";
import dom from "@left4code/tw-starter/dist/js/dom";
import Calendar from '../../components/calendar/Main'
import { createTask, getAllTasks, updateTask } from '../../services/api/tasks/tasks'
import Notification from "../../base-components/notification/Main";

function Tasks() {

  const [allTasks, setAllTasks] = useState([])
  const [event, setEvent] = useState([])
  const [form, setForm] = useState({
    id: "",
    date: "",
    allDay: "",
    startingAt: "",
    endingAt: "",
    title: "",
    description: "",
    taskOwner: "-",
    customer: "-",
  })
  const [closing, setClosing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notificationMsg, setNotificationMsg] = useState({
    icon: "CheckCircle",
    textType: "text-success",
    message: "New task successfully created!!",
  });

  const successNotification = useRef();
  const successNotificationToggle = () => {
    // Show notification
    successNotification.current.showToast();
  };

  const mainFetch = async () => {
    const res = await getAllTasks()
    setAllTasks(res)
  }

  useEffect(() => {
    mainFetch()
  }, [])

  useEffect(() => {
    if (allTasks) {
      const eventTemp = []
      allTasks.forEach((task) => {
        if (task.allDay == 1) {
          eventTemp.push({
            title: task.subject,
            start: task.date,
            end: task.date,
            allDay: true,
            description: task.description,
            id: task.id,
            owner_id: task.owner_id,
            customer_id: task.customer_id,
          })
        } else {
          eventTemp.push({
            title: task.subject,
            start: task.date,
            end: task.date,
            startingAt: task.startingAt,
            endingAt: task.endingAt,
            allDay: false,
            description: task.description,
            id: task.id,
            owner_id: task.owner_id,
            customer_id: task.customer_id,
          })
        }
      })
      setEvent(eventTemp)
    }

  }, [allTasks])

  const handleTaskSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (form.date == "" || form.title == "" || form.description == "" || form.taskOwner == "-" || form.customer == "-") {
      setNotificationMsg({
        icon: "AlertOctagon",
        textType: "text-danger",
        message: "Please fill the fields",
      });
      successNotificationToggle()
      setLoading(false)
      return
    }
    const res = await createTask(form)
    if (res == true) {
      setClosing(!closing)
      setForm({
        id: "",
        date: "",
        allDay: "",
        startingAt: "-",
        endingAt: "",
        title: "",
        description: "",
        taskOwner: "-",
        customer: "-",
      })
      setNotificationMsg({
        icon: "CheckCircle",
        textType: "text-success",
        message: "New task successfully created!!",
      });
      mainFetch()
      successNotificationToggle()
      setLoading(false)
    }
  }

  const handleTaskEdit = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (form.date == "" || form.title == "" || forn.description == "" || form.taskOwner == "-" || form.customer == "-") {
      setNotificationMsg({
        icon: "AlertOctagon",
        textType: "text-danger",
        message: "Please fill the fields",
      });
      successNotificationToggle()
      setLoading(false)
      return
    }
    const res = await updateTask(form)
    if (res == true) {
      setClosing(!closing)
      setForm({
        id: "",
        date: "",
        allDay: "",
        startingAt: "-",
        endingAt: "",
        title: "",
        description: "",
        taskOwner: "-",
        customer: "-",
      })
      setNotificationMsg({
        icon: "CheckCircle",
        textType: "text-success",
        message: "Task successfully updated!!",
      });
      mainFetch()
      successNotificationToggle()
      setLoading(false)
    }
  }

  const dragableOptions = {
    itemSelector: ".event",
    eventData(eventEl) {
      return {
        title: dom(eventEl).find(".event__title").html(),
        duration: {
          days: parseInt(dom(eventEl).find(".event__days").text()),
        },
      };
    },
  };

  return (
    <>
      <Notification
        getRef={(el) => {
          successNotification.current = el;
        }}
        options={{
          duration: 3000,
        }}
        className="flex"
      >
        <Lucide
          icon={notificationMsg.icon}
          className={notificationMsg.textType}
        />
        <div className="ml-4 mr-4">
          <div className="font-medium">{notificationMsg.message}</div>
          {/* <div className="text-slate-500 mt-1">
              The message will be sent in 5 minutes.
            </div> */}
        </div>
      </Notification>
      <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Calendar</h2>
        <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
          <button className="btn btn-primary shadow-md mr-2">
            Print Schedule
          </button>
          <Dropdown className="ml-auto sm:ml-0">
            <DropdownToggle className="btn px-2 box">
              <span className="w-5 h-5 flex items-center justify-center">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="w-40">
              <DropdownContent>
                <DropdownItem>
                  <Lucide icon="Share2" className="w-4 h-4 mr-2" /> Share
                </DropdownItem>
                <DropdownItem>
                  <Lucide icon="Settings" className="w-4 h-4 mr-2" /> Settings
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5 mt-5">
        {/* BEGIN: Calendar Side Menu */}
        {/* <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
          <div className="box p-5 intro-y">
            <button type="button" className="btn btn-primary w-full mt-2">
              <Lucide icon="Edit3" className="w-4 h-4 mr-2" /> Add New Schedule
            </button>
            <div className="relative">
              <div className="event p-3 -mx-3 cursor-pointer transition duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md flex items-center">
                <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                <div className="pr-10">
                  <div className="event__title truncate">VueJS Amsterdam</div>
                  <div className="text-slate-500 text-xs mt-0.5">
                    <span className="event__days">2</span> Days{" "}
                    <span className="mx-1">•</span> 10:00 AM
                  </div>
                </div>
              </div>
              <a
                className="flex items-center absolute top-0 bottom-0 my-auto right-0"
                href=""
              >
                <Lucide icon="Edit" className="w-4 h-4 text-slate-500" />
              </a>
            </div>
            <div className="relative">
              <div className="event p-3 -mx-3 cursor-pointer transition duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md flex items-center">
                <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                <div className="pr-10">
                  <div className="event__title truncate">
                    Vue Fes Japan 2019
                  </div>
                  <div className="text-slate-500 text-xs mt-0.5">
                    <span className="event__days">3</span> Days{" "}
                    <span className="mx-1">•</span> 07:00 AM
                  </div>
                </div>
              </div>
              <a
                className="flex items-center absolute top-0 bottom-0 my-auto right-0"
                href=""
              >
                <Lucide icon="Edit" className="w-4 h-4 text-slate-500" />
              </a>
            </div>
            <div className="relative">
              <div className="event p-3 -mx-3 cursor-pointer transition duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md flex items-center">
                <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                <div className="pr-10">
                  <div className="event__title truncate">Laracon 2021</div>
                  <div className="text-slate-500 text-xs mt-0.5">
                    <span className="event__days">4</span> Days{" "}
                    <span className="mx-1">•</span> 11:00 AM
                  </div>
                </div>
              </div>
              <a
                className="flex items-center absolute top-0 bottom-0 my-auto right-0"
                href=""
              >
                <Lucide icon="Edit" className="w-4 h-4 text-slate-500" />
              </a>
            </div>
            <div
              className="text-slate-500 p-3 text-center hidden"
              id="calendar-no-events"
            >
              No events yet
            </div>
            <div className="form-check form-switch flex">
              <label className="form-check-label" htmlFor="checkbox-events">
                Remove after drop
              </label>
              <input
                className="show-code form-check-input ml-auto"
                type="checkbox"
                id="checkbox-events"
              />
            </div>
          </div>
        </div> */}
        {/* END: Calendar Side Menu */}
        {/* BEGIN: Calendar Content */}
        <div className="col-span-12 xl:col-span-12 2xl:col-span-12">
          <div className="box p-5">
            <Calendar event={event} type="task" handleSubmit={handleTaskSubmit} handleEdit={handleTaskEdit} setForm={setForm} form={form} closing={closing} loading={loading} />
          </div>
        </div>
        {/* END: Calendar Content */}
      </div>
    </>
  );
}

export default Tasks;
