import React, { useState, useEffect } from "react";
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownHeader,
  DropdownDivider,
  DropdownFooter,
  DropdownItem,
} from "@/base-components";
import classnames from "classnames";
// import ReportLineChart from "@/components/report-line-chart/Main";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import logoUrl from "@/assets/images/logo.svg";
import { getUserById } from "../../services/api/users/users";
import { useNavigate, useParams } from 'react-router-dom'

function Main() {
  const [mainInfos, setMainInfos] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const getInfos = async () => {
      const res = await getUserById(userId);
      setMainInfos(res);
    };
    getInfos();
  }, []);
  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Profile View</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        {/* BEGIN: Profile Menu */}
        <div className="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse">
          <div className="intro-y box mt-5 lg:mt-0">
            <div className="relative flex items-center p-5">
              <div className="w-12 h-12 image-fit">
                <img
                  alt="Alpha - Evolutive CRM"
                  className="rounded-full"
                  src={mainInfos && mainInfos.photo ? mainInfos.photo : logoUrl}
                />
              </div>
              {mainInfos && (
                <div className="ml-4 mr-auto">
                  <div className="font-medium text-base">{`${mainInfos.first_name} ${mainInfos.last_name}`}</div>
                  <div className="text-slate-500">{mainInfos.role}</div>
                </div>
              )}
            </div>
            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center font-medium cursor-pointer" onClick={() => navigate(`/alpha/users/profile-view/${mainInfos.id}`)}>
                <Lucide icon="Activity" className="w-4 h-4 mr-2" /> Personal
                Informations
              </div>
              <div className="flex items-center mt-5 text-primary" >
                <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Social Networks
              </div>
            </div>
          </div>
          <div className="intro-y box p-5 bg-primary text-white mt-5">
            <div className="flex items-center">
              <div className="font-medium text-lg">Important Update</div>
              <div className="text-xs bg-white dark:bg-primary dark:text-white text-slate-700 px-1 rounded-md ml-auto">
                New
              </div>
            </div>
            <div className="mt-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </div>
            <div className="font-medium flex mt-5">
              <button
                type="button"
                className="btn py-1 px-2 border-white text-white dark:text-slate-300 dark:bg-darkmode-400 dark:border-darkmode-400"
              >
                Read More
              </button>
              <button
                type="button"
                className="btn py-1 px-2 border-transparent text-white dark:border-transparent ml-auto"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
        {/* END: Profile Menu */}
        <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
          <div className="grid grid-cols-12 gap-6">
            {/* BEGIN: Daily Sales */}
            <div className="intro-y box col-span-12 2xl:col-span-6">
              <div className="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 className="font-medium text-base mr-auto">Latest Sales</h2>
                <Dropdown className="ml-auto sm:hidden">
                  <DropdownToggle tag="a" className="w-5 h-5 block" href="#">
                    <Lucide
                      icon="MoreHorizontal"
                      className="w-5 h-5 text-slate-500"
                    />
                  </DropdownToggle>
                  <DropdownMenu className="w-40">
                    <DropdownContent>
                      <DropdownItem>
                        <Lucide icon="File" className="w-4 h-4 mr-2" /> Download
                        Excel
                      </DropdownItem>
                    </DropdownContent>
                  </DropdownMenu>
                </Dropdown>
                <button className="btn btn-outline-secondary hidden sm:flex">
                  <Lucide icon="File" className="w-4 h-4 mr-2" /> Download Excel
                </button>
              </div>
              <div className="p-5">
                <div className="relative flex items-center">
                  <div className="w-12 h-12 flex-none image-fit">
                    <img
                      alt="Alpha - Evolutive CRM"
                      className="rounded-full"
                      src={$f()[0].photos[0]}
                    />
                  </div>
                  <div className="ml-4 mr-auto">
                    <a href="" className="font-medium">
                      {$f()[0].users[0].name}
                    </a>
                    <div className="text-slate-500 mr-5 sm:mr-5">
                      Landing page + Logo
                    </div>
                  </div>
                  <div className="font-medium text-slate-600 dark:text-slate-500">
                    +$190
                  </div>
                </div>
                <div className="relative flex items-center mt-5">
                  <div className="w-12 h-12 flex-none image-fit">
                    <img
                      alt="Alpha - Evolutive CRM"
                      className="rounded-full"
                      src={$f()[1].photos[0]}
                    />
                  </div>
                  <div className="ml-4 mr-auto">
                    <a href="" className="font-medium">
                      {$f()[1].users[0].name}
                    </a>
                    <div className="text-slate-500 mr-5 sm:mr-5">
                      Logo + Print
                    </div>
                  </div>
                  <div className="font-medium text-slate-600 dark:text-slate-500">
                    +$250
                  </div>
                </div>
                <div className="relative flex items-center mt-5">
                  <div className="w-12 h-12 flex-none image-fit">
                    <img
                      alt="Alpha - Evolutive CRM"
                      className="rounded-full"
                      src={$f()[2].photos[0]}
                    />
                  </div>
                  <div className="ml-4 mr-auto">
                    <a href="" className="font-medium">
                      {$f()[2].users[0].name}
                    </a>
                    <div className="text-slate-500 mr-5 sm:mr-5">
                      Community management
                    </div>
                  </div>
                  <div className="font-medium text-slate-600 dark:text-slate-500">
                    +$210
                  </div>
                </div>
              </div>
            </div>
            {/* END: Daily Sales */}

            {/* BEGIN: Notes */}
            <div className="intro-y box col-span-12 2xl:col-span-6">
              <div className="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 className="font-medium text-base mr-auto">Notes</h2>
                <button className="tiny-slider-navigator btn btn-outline-secondary px-2">
                  Edit
                </button>
              </div>
              <div className="px-5">
                <div className="font-medium text-lg mt-5">To do list</div>
                <div className="text-slate-600 dark:text-slate-500 mt-2 mb-5">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever. <br />
                  <br />
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry since the 1500s.
                </div>
              </div>
            </div>
            {/* END: Notes */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
