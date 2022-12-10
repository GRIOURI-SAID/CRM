import React, { useState, useEffect, useRef } from "react";
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Modal,
  ModalBody,
} from "@/base-components";
import { LoadingIcon } from "@/base-components";

import {
  getAllAccess,
} from "../../services/api/access/access";
import {
  getUsers,
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from '../../services/api/users/users'
import Notification from "../../base-components/notification/Main";
import logoUrl from "@/assets/images/logo.svg";
import { useNavigate } from 'react-router-dom'


function Users() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [userIdDelete, setUserIdDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState(null);
  const [allAccess, setAllAccess] = useState(null);
  const [newUser, setNewUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    role: "",
    mail: "",
    password: "",
    access_id: "",
  });
  const [notificationMsg, setNotificationMsg] = useState({
    icon: "CheckCircle",
    textType: "text-success",
    message: "New user successfully created!!",
  });

  const successNotification = useRef();
  const successNotificationToggle = () => {
    // Show notification
    successNotification.current.showToast();
  };

  const navigate = useNavigate();

  const mainFetch = async () => {
    const res = await getUsers();
    const res2 = await getAllAccess();

    setAllUsers(res);
    setAllAccess(res2);
  };

  useEffect(() => {
    mainFetch();
  }, [refreshFlag]);

  const openModal = (status) => {
    setShowModal(true);
  };

  const handleNewUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (
      newUser.first_name == "" ||
      newUser.last_name == "" ||
      newUser.role == "" ||
      newUser.mail == "" ||
      newUser.password == "" ||
      newUser.access_id == ""
    ) {
      setError("Please fill all fields.");
      setLoading(false);
      return;
    }
    if (newUser.password.length < 6) {
      setError("Password is not strong. Please choose at least 6 characters.");
      setLoading(false);
      return;
    }
    const res = await createUser(newUser);
    if (res == "mail") {
      setError("This email is already in use.");
      setLoading(false);
      return;
    }
    setNotificationMsg({
      icon: "CheckCircle",
      textType: "text-success",
      message: "New user successfully created!!",
    });
    setRefreshFlag(!refreshFlag);
    setLoading(false);
    setShowModal(false);
    successNotificationToggle();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (
      newUser.first_name == "" ||
      newUser.last_name == "" ||
      newUser.role == "" ||
      newUser.mail == "" ||
      newUser.password == "" ||
      newUser.access_id == ""
    ) {
      setError("Please fill all fields.");
      setLoading(false);
      return;
    }
    if (newUser.password.length < 6) {
      setError("Password is not strong. Please choose at least 6 characters.");
      setLoading(false);
      return;
    }
    const res = await updateUser(newUser);
    if (res == "mail") {
      setError("This email is already in use.");
      setLoading(false);
      return;
    }
    setNotificationMsg({
      icon: "CheckCircle",
      textType: "text-success",
      message: "User successfully updated created!!",
    });
    setRefreshFlag(!refreshFlag);
    setLoading(false);
    setShowModal(false);
    successNotificationToggle();
  };

  const handleDelete = (bool, id) => {
    setUserIdDelete(id);
    setDeleteConfirmationModal(bool);
  };

  const handleDeleteUser = async () => {
    const res = await deleteUser(userIdDelete);
    setNotificationMsg({
      icon: "CheckCircle",
      textType: "text-success",
      message: "User successfully deleted!!",
    });
    successNotificationToggle();
    setDeleteConfirmationModal(false);
    setRefreshFlag(!refreshFlag);
  };

  const handleGetUser = async (id) => {
    setNewUser({
      id: "",
      first_name: "",
      last_name: "",
      role: "",
      mail: "",
      password: "",
      access_id: "",
    });
    const res = await getUser(id);
    setNewUser({
      id: id,
      first_name: res[0].first_name,
      last_name: res[0].last_name,
      role: res[0].role,
      mail: res[0].mail,
      password: res[0].password,
      access_id: res[0].access_id,
    });
    setIsUpdate(true);
    openModal(1);
  };

  const handleOpenModal = (value) => {
    openModal(value);
    setIsUpdate(false);
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
      <h2 className="intro-y text-lg font-medium mt-10">Users Layout</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <button className="text-center">
            <a
              onClick={() => handleOpenModal(1)}
              // href="javascript:;"
              data-tw-toggle="modal"
              data-tw-target="#basic-modal-preview"
              className="btn btn-primary"
            >
              Add New User
            </a>
          </button>
          {/* <div
            id="basic-modal-preview"
            className="modal"
            tabIndex="-1"
            aria-hidden="true"
          > */}
          <Modal
            show={deleteConfirmationModal}
            onHidden={() => {
              setDeleteConfirmationModal(false);
            }}
          >
            <ModalBody className="p-0">
              <div className="p-5 text-center">
                <Lucide
                  icon="XCircle"
                  className="w-16 h-16 text-danger mx-auto mt-3"
                />
                <div className="text-3xl mt-5">Are you sure?</div>
                <div className="text-slate-500 mt-2">
                  Do you really want to delete this user? <br />
                  This process cannot be undone.
                </div>
              </div>
              <div className="px-5 pb-8 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setDeleteConfirmationModal(false);
                  }}
                  className="btn btn-outline-secondary w-24 mr-1"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger w-24"
                  onClick={handleDeleteUser}
                >
                  Delete
                </button>
              </div>
            </ModalBody>
          </Modal>
          <Modal
            size="modal-lg"
            show={showModal}
            // slideOver={true}
            onHidden={() => {
              setShowModal(false);
            }}
          >
            {/* <div className="modal-dialog">
              <div className="modal-content"> */}
            <ModalBody className="p-5 text-left">
              <form onSubmit={isUpdate ? handleUpdate : handleNewUser}>
                {/* <div className="modal-body p-5 text-left"> */}
                <h2 className="font-medium text-base mr-auto">Add New User</h2>
                <div className="modal-body grid grid-cols-12 gap-4 gap-y-3">
                  <div className="col-span-12 sm:col-span-6">
                    {" "}
                    <label htmlFor="modal-form-1" className="form-label">
                      First Name
                    </label>{" "}
                    <input
                      id="modal-form-1"
                      type="text"
                      className="form-control"
                      placeholder="John"
                      value={newUser.first_name}
                      onChange={(e) =>
                        setNewUser({ ...newUser, first_name: e.target.value })
                      }
                    />{" "}
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    {" "}
                    <label htmlFor="modal-form-2" className="form-label">
                      Last Name
                    </label>{" "}
                    <input
                      id="modal-form-2"
                      type="text"
                      className="form-control"
                      placeholder="Doe"
                      value={newUser.last_name}
                      onChange={(e) =>
                        setNewUser({ ...newUser, last_name: e.target.value })
                      }
                    />{" "}
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    {" "}
                    <label htmlFor="modal-form-3" className="form-label">
                      Job
                    </label>{" "}
                    <input
                      id="modal-form-3"
                      type="text"
                      className="form-control"
                      placeholder="Frontend Developer"
                      value={newUser.role}
                      onChange={(e) =>
                        setNewUser({ ...newUser, role: e.target.value })
                      }
                    />{" "}
                  </div>
                  {isUpdate == false && (
                    <>
                      <div className="col-span-12 sm:col-span-6">
                        {" "}
                        <label htmlFor="modal-form-4" className="form-label">
                          Email
                        </label>{" "}
                        <input
                          id="modal-form-4"
                          type="email"
                          className="form-control"
                          placeholder="johndoe@mail.com"
                          value={newUser.mail}
                          onChange={(e) =>
                            setNewUser({ ...newUser, mail: e.target.value })
                          }
                        />{" "}
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        {" "}
                        <label htmlFor="modal-form-5" className="form-label">
                          Password
                        </label>{" "}
                        <input
                          id="modal-form-5"
                          type="text"
                          className="form-control"
                          placeholder="At least 6 characters"
                          value={newUser.password}
                          onChange={(e) =>
                            setNewUser({ ...newUser, password: e.target.value })
                          }
                        />{" "}
                      </div>
                    </>
                  )}
                  <div className="col-span-12 sm:col-span-6">
                    {" "}
                    <label htmlFor="modal-form-6" className="form-label">
                      Access
                    </label>
                    <select
                      id="modal-form-6"
                      className="form-select"
                      value={newUser.access_id}
                      onChange={(e) =>
                        setNewUser({ ...newUser, access_id: e.target.value })
                      }
                    >
                      <option value="-">Choose an access</option>
                      {allAccess &&
                        allAccess.map((access, index) => {
                          return (
                            <option key={index} value={access.id}>{access.name}</option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="modal-footer text-left pl-0 pb-0">
                  {" "}
                  {loading ? (
                    <div className="intro-y col-span-12 flex items-center justify-start sm:justify-start mt-5 pl-5">
                      <LoadingIcon icon="puff" className="w-8 h-8" />
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        data-tw-dismiss="modal"
                        className="btn btn-outline-secondary w-20"
                      >
                        Cancel
                      </button>{" "}
                      <button type="submit" className="btn btn-primary w-20">
                        Save
                      </button>{" "}
                      {error && <div className="text-danger mt-2">{error}</div>}
                    </>
                  )}
                </div>
                {/* </div> */}
              </form>
            </ModalBody>
            {/* </div>
            </div> */}
          </Modal>
          {/* </div> */}
          <Dropdown>
            <DropdownToggle className="btn px-2 box">
              <span className="w-5 h-5 flex items-center justify-center">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="w-40">
              <DropdownContent>
                <DropdownItem>
                  <Lucide icon="Users" className="w-4 h-4 mr-2" /> Add Group
                </DropdownItem>
                <DropdownItem>
                  <Lucide icon="MessageCircle" className="w-4 h-4 mr-2" /> Send
                  Message
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          <div className="hidden md:block mx-auto text-slate-500">
            Showing 1 to 10 of 150 entries
          </div>
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Users Layout */}
        {allUsers &&
          allUsers.map((user, index) => {
            var access = allAccess.filter((acc) => acc.id == user.access_id);
            return (
              <div
                key={index}
                className="intro-y col-span-12 md:col-span-6 lg:col-span-4"
              >
                <div className="box">
                  <div className="flex items-start px-5 pt-5">
                    <div className="w-full flex flex-col lg:flex-row items-center">
                      <div className="w-16 h-16 image-fit">
                        <img
                          alt="Alpha - Evolutive CRM"
                          className="rounded-full"
                          src={user.photo ? user.photo : logoUrl}
                        />
                      </div>
                      <div className="lg:ml-4 text-center lg:text-left mt-3 lg:mt-0">
                        <a href="" className="font-medium">
                          {`${user.first_name} ${user.last_name}`}
                        </a>
                        <div className="text-slate-500 text-xs mt-0.5">
                          {user.role}
                        </div>
                      </div>
                    </div>
                    <Dropdown className="absolute right-0 top-0 mr-5 mt-3">
                      <DropdownToggle
                        tag="a"
                        className="w-5 h-5 block"
                        href="#"
                      >
                        <Lucide
                          icon="MoreHorizontal"
                          className="w-5 h-5 text-slate-500"
                        />
                      </DropdownToggle>
                      <DropdownMenu className="w-40">
                        <DropdownContent>
                          <DropdownItem>
                            <div
                              className="flex"
                              onClick={() => handleGetUser(user.id)}
                            >
                              <Lucide icon="Edit2" className="w-4 h-4 mr-2" />{" "}
                              Edit
                            </div>
                          </DropdownItem>
                          <DropdownItem>
                            <div
                              className="flex"
                              onClick={() => {
                                handleDelete(true, user.id);
                              }}
                            >
                              <Lucide icon="Trash" className="w-4 h-4 mr-2" />{" "}
                              Delete
                            </div>
                          </DropdownItem>
                        </DropdownContent>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="text-center lg:text-left pl-5 pr-5 pb-3">
                    <div className="flex items-center justify-center lg:justify-start text-slate-500 mt-5">
                      <Lucide icon="Mail" className="w-3 h-3 mr-2" />
                      {user.mail}
                    </div>
                    <div className="flex items-center justify-center lg:justify-start text-slate-500 mt-1">
                      <Lucide icon="Key" className="w-3 h-3 mr-2" />
                      {access[0].name}
                    </div>
                  </div>
                  <div className="text-center lg:text-right p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                    <button className="btn btn-primary py-1 px-2 mr-2">
                      Message
                    </button>
                    <button className="btn btn-outline-secondary py-1 px-2" onClick={() => navigate(`/alpha/users/profile-view/${user.id}`)}>
                      Profile
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        {/* END: Users Layout */}
        {/* BEGIN: Pagination */}
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
          <nav className="w-full sm:w-auto sm:mr-auto">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronRight" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsRight" className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </nav>
          <select className="w-20 form-select box mt-3 sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </select>
        </div>
        {/* END: Pagination */}
      </div>
    </>
  );
}

export default Users;
