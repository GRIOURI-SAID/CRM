import React, { useState, useEffect } from "react";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import logoUrl from "@/assets/images/logo.svg";
import illustrationUrl from "@/assets/images/illustration.svg";
import { verifMail, loginFunc } from "../services/api/login/login"
import { LoadingIcon } from "@/base-components";
import { useNavigate } from "react-router-dom";
import InputPassword from '../base-components/inputs/InputPassword'

function Main() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorEmail(false);
    setErrorPassword(false);
    setErrorLogin(false);
    setLoading(true);
    if (!loginData.email || !loginData.password) {
      if (!loginData.email) {
        setErrorEmail(true);
      }
      if (!loginData.password) {
        setErrorPassword(true);
      }
      setLoading(false);
      return;
    }
    const verifMailGood = await verifMail(loginData.email);
    if (!verifMailGood.data) {
      setLoading(false);
      return setErrorLogin(true);
    }
    const loginUser = await loginFunc(loginData.email, loginData.password);
    if (!loginUser.data) {
      setLoading(false);
      return setErrorLogin(true);
    }

    setLoading(false);
    window.location.reload();
  };

  return (
    <>
      <div>
        <DarkModeSwitcher />
        <div className="container sm:px-10">
          <div className="block xl:grid grid-cols-2 gap-4">
            {/* BEGIN: Login Info */}

            <div className="hidden xl:flex flex-col min-h-screen">
              <a href="" className="-intro-x flex items-center pt-5">
                <img alt="Alpha Modular CRM" className="w-6" src={logoUrl} />
                <span className="text-white text-lg ml-3"> Alpha</span>
              </a>
              <div className="my-auto">
                <img
                  alt="Alpha Modular CRM"
                  className="-intro-x w-1/2 -mt-16"
                  src={illustrationUrl}
                />
                <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                  A few more clicks to <br />
                  sign in to your account.
                </div>
                <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                  Manage all your e-commerce accounts in one place
                </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
              <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                <form onSubmit={handleSubmit}>
                  <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                    Sign In
                  </h2>
                  <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                    A few more clicks to sign in to your account. Manage all
                    your e-commerce accounts in one place
                  </div>
                  <div className="intro-x mt-8">
                    <input
                      type="text"
                      className="intro-x login__input form-control py-3 px-4 block"
                      placeholder="Email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                    />
                    {errorEmail && (
                      <div className="text-danger mt-2 ml-2">
                        email is a required field
                      </div>
                    )}
                    <InputPassword value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="form-control py-3 px-4 block mt-4"
                      placeholder="Password" />

                    {errorPassword && (
                      <div className="text-danger mt-2 ml-2">
                        password is a required field
                      </div>
                    )}
                  </div>
                  <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                    <div className="flex items-center mr-auto">
                      {/* <input
                      id="remember-me"
                      type="checkbox"
                      className="form-check-input border mr-2"
                    />
                    <label
                      className="cursor-pointer select-none"
                      htmlFor="remember-me"
                    >
                      Remember me
                    </label> */}
                    </div>
                    <a href="">Forgot Password?</a>
                  </div>
                  <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                    <button className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top">
                      Login
                    </button>
                    <button className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top">
                      Register
                    </button>
                  </div>
                  {errorLogin && (
                    <div className="text-danger mt-2 ml-2">
                      Email or password is wrong
                    </div>
                  )}
                  {loading && (
                    <div className="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center mt-5">
                      <LoadingIcon icon="puff" className="w-8 h-8" />
                    </div>
                  )}
                  <div className="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left">
                    By signin up, you agree to our
                    <a className="text-primary dark:text-slate-200" href="">
                      Terms and Conditions
                    </a>
                    <span> & </span>
                    <a className="text-primary dark:text-slate-200" href="">
                      Privacy Policy
                    </a>
                  </div>
                </form>
              </div>
            </div>
            {/* END: Login Form */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
