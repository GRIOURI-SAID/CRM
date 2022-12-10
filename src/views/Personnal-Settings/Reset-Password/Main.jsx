import React, { useState, useEffect, useRef } from "react";
import {
  Lucide,
} from "@/base-components";
import logoUrl from "@/assets/images/logo.svg";
import {
  getInfosUser,
  changeEmail,
  getProfilPic,
  changePassword,
} from "../../../services/api/users/users";
import { LoadingIcon } from "@/base-components";
import Notification from "../../../base-components/notification/Main";
import { useNavigate } from 'react-router-dom'
import InputPassword from "../../../base-components/inputs/InputPassword";

function Main() {

  const [step, setStep] = useState(1)
  const [personalInfos, setPersonalInfos] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMainInfos, setErrorMainInfos] = useState(false);
  const [loadingMainInfos, setLoadingMainInfos] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState({
    icon: "CheckCircle",
    textType: "text-success",
    message: "Informations successfully updated",
  });
  const [userProfilPic, setUserProfilPic] = useState(null);
  const [flagChange, setFlagChange] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getInfos = async () => {
      const result = await getInfosUser();
      setPersonalInfos(result);
      const resProfilPic = await getProfilPic();
      setUserProfilPic(resProfilPic);
    };
    getInfos();
  }, [flagChange]);


  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoadingMainInfos(true);
    setErrorMainInfos(false);

    if (currentPassword == "" || newPassword == "" || confirmPassword == "") {
      setNotificationMsg({
        icon: "AlertOctagon",
        textType: "text-danger",
        message: "Please fill all the fields.",
      });
      successNotificationToggle();
      setLoadingMainInfos(false);
      return
    }

    if (newPassword != confirmPassword) {
      setNotificationMsg({
        icon: "AlertOctagon",
        textType: "text-danger",
        message: "New password and Confirm password must be the same.",
      });
      setConfirmPassword("")
      successNotificationToggle();
      setLoadingMainInfos(false);
      return
    }

    const result = await changePassword(currentPassword, newPassword);

    if (result == "errorPassword") {
      setNotificationMsg({
        icon: "AlertOctagon",
        textType: "text-danger",
        message: "Your current password is invalid.",
      });
      setCurrentPassword("")
      successNotificationToggle();
      setLoadingMainInfos(false);
      return
    }

    setNotificationMsg({
      icon: "CheckCircle",
      textType: "text-success",
      message: "Your password has been successfully changed.",
    });

    successNotificationToggle();
    setLoadingMainInfos(false);
  };

  // Success notification
  const successNotification = useRef();
  const successNotificationToggle = () => {
    // Show notification
    successNotification.current.showToast();
  };


  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Account Settings</h2>

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
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: Profile Menu */}
        <div className="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse">
          <div className="intro-y box mt-5">
            <div className="relative flex items-center p-5">
              <div className="w-12 h-12 image-fit">
                <img
                  alt="Alpha - Evolutive CRM"
                  className="rounded-full"
                  src={userProfilPic ? userProfilPic : logoUrl}
                />
              </div>
              <div className="ml-4 mr-auto">
                <div className="font-medium text-base">
                  {personalInfos &&
                    `${personalInfos.first_name} ${personalInfos.last_name}`}
                </div>
                <div className="text-slate-500">
                  {personalInfos && `${personalInfos.role}`}
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center cursor-pointer" onClick={() => navigate("/alpha/personnal/profile-view")}>
                <Lucide icon="Activity" className="w-4 h-4 mr-2" /> Personal
                Informations
              </div>
              <div className="flex items-center mt-5 cursor-pointer" onClick={() => navigate("/alpha/personnal/account-settings")}>
                <Lucide icon="Box" className="w-4 h-4 mr-2" /> Account Settings
              </div>
            </div>
            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center cursor-pointer" onClick={() => navigate("/alpha/personnal/email-settings")}>
                <Lucide icon="Activity" className="w-4 h-4 mr-2" /> Email
                Settings
              </div>
              {/* <a className="flex items-center mt-5" href="">
                    <Lucide icon="Box" className="w-4 h-4 mr-2" /> Saved Credit
                    Cards
                  </a> */}
              <div className="flex items-center mt-5 cursor-pointer" onClick={() => navigate("/alpha/personnal/social-networks")}>
                <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Social Networks
              </div>
              {/* <a className="flex items-center mt-5" href="">
                    <Lucide icon="Settings" className="w-4 h-4 mr-2" /> Tax
                    Information
                  </a> */}
            </div>
            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400 flex items-left">
              <button type="button" className="btn btn-secondary py-1 px-2" >
                Change Password
              </button>
            </div>
          </div>
        </div>
        {/* END: Profile Menu */}
        <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
          {/* BEGIN: Display Information */}
          <div className="intro-y box lg:mt-5">
            <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="font-medium text-base mr-auto">
                Change Password
              </h2>
            </div>
            <div className="p-5">
              <div className="flex flex-col-reverse xl:flex-row flex-col">
                <div className="flex-1 mt-6 xl:mt-0">
                  <form onSubmit={handleChangePassword}>
                    <div className="grid grid-cols-12 gap-x-5">
                      <div className="col-span-12 2xl:col-span-6">
                        <div className="mt-3">
                          <label
                            htmlFor="update-profile-form-4"
                            className="form-label"
                          >
                            Please enter your current password
                          </label>
                          <InputPassword value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="form-control"
                            placeholder="Current password" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-5 mt-4">
                      <div className="col-span-12 2xl:col-span-6">
                        <div className="mt-3">
                          <label
                            htmlFor="update-profile-form-4"
                            className="form-label"
                          >
                            Please enter your new password
                          </label>
                          <InputPassword value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            placeholder="New password" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-5 mb-4">
                      <div className="col-span-12 2xl:col-span-6">
                        <div className="mt-3">
                          <label
                            htmlFor="update-profile-form-4"
                            className="form-label"
                          >
                            Please Confirm your new password
                          </label>
                          <InputPassword value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control"
                            placeholder="Confirm password" />
                        </div>
                      </div>
                    </div>
                    {loadingMainInfos ? (
                      <div className="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end pl-5 mt-5">
                        <LoadingIcon icon="puff" className="w-8 h-8" />
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary w-20 mt-3"
                      >
                        Verify
                      </button>
                    )}
                    {errorMainInfos && (
                      <div className="text-danger mt-2">
                        Please fill all the fields
                      </div>
                    )}
                  </form>
                </div>

              </div>
            </div>
          </div>
          {/* END: Display Information */}
          {/* BEGIN: Personal Informations */}
          {/* <div className="intro-y box mt-5">
                <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="font-medium text-base mr-auto">
                    Business Information
                  </h2>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-12 gap-x-5">
                    <div className="col-span-12 xl:col-span-6">
                      <div>
                        <label
                          htmlFor="update-profile-form-7"
                          className="form-label"
                        >
                          Name
                        </label>
                        <input
                          id="update-profile-form-7"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                          value={$f()[0].users[0].name}
                          onChange={() => {}}
                          disabled
                        />
                      </div>
                      <div className="mt-3">
                        <label
                          htmlFor="update-profile-form-8"
                          className="form-label"
                        >
                          ID Type
                        </label>
                        <select id="update-profile-form-8" className="form-select">
                          <option>Patour</option>
                          <option>Mourche</option>
                          <option>Baam</option>
                        </select>
                      </div>
                      <div className="mt-3">
                        <label
                          htmlFor="update-profile-form-9"
                          className="form-label"
                        >
                          ID Number
                        </label>
                        <input
                          id="update-profile-form-9"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                          value="357821204950001"
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                    <div className="col-span-12 xl:col-span-6">
                      <div className="mt-3 xl:mt-0">
                        <label
                          htmlFor="update-profile-form-10"
                          className="form-label"
                        >
                          Phone Number
                        </label>
                        <input
                          id="update-profile-form-10"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                          value="65570828"
                          onChange={() => {}}
                        />
                      </div>
                      <div className="mt-3">
                        <label
                          htmlFor="update-profile-form-11"
                          className="form-label"
                        >
                          Address
                        </label>
                        <input
                          id="update-profile-form-11"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                          value="10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore"
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button type="button" className="btn btn-primary w-20 mr-auto">
                      Save
                    </button>
                  </div>
                </div>
              </div> */}
          {/* END: Personal Informations */}
        </div>
      </div>
    </>
  );
}

export default Main;
