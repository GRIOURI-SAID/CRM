import React from "react";

import {
  Lucide,
  Tippy,
  Alert,
  TinySlider,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@/base-components";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";
import ReportLineChart from "@/components/report-line-chart/Main";
import ReportPieChart from "@/components/report-pie-chart/Main";
import ReportBarChart from "@/components/report-bar-chart/Main";
import ReportBarChart1 from "@/components/report-bar-chart-1/Main";
import ReportDonutChart from "@/components/report-donut-chart/Main";
import ReportDonutChart1 from "@/components/report-donut-chart-1/Main";
import ReportDonutChart2 from "@/components/report-donut-chart-2/Main";
import SimpleLineChart1 from "@/components/simple-line-chart-1/Main";
import SimpleLineChart3 from "@/components/simple-line-chart-3/Main";
import SimpleLineChart4 from "@/components/simple-line-chart-4/Main";
import ReportMap from "@/components/report-map/Main";


function Dashboard() {



  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Dashboard</h2>
      </div>
      <div className="relative">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-9 2xl:col-span-9 z-10">
            <div className="mt-6 -mb-6 intro-y">
              <Alert className="box bg-primary text-white flex items-center mb-6">
                {({ dismiss }) => (
                  <>
                    <span>
                      Introducing new dashboard! Download now at
                      <a
                        href="https://alpha-crm.online/update3.2"
                        className="underline ml-1"
                        target="blank"
                      >
                        alpha-crm.online
                      </a>
                      <button className="rounded-md bg-white bg-opacity-20 dark:bg-darkmode-300 hover:bg-opacity-30 py-0.5 px-2 -my-3 ml-2">
                        Live Preview
                      </button>
                    </span>
                    <button
                      type="button"
                      className="btn-close text-white"
                      onClick={dismiss}
                      aria-label="Close"
                    >
                      <Lucide icon="X" className="w-4 h-4" />
                    </button>
                  </>
                )}
              </Alert>
            </div>
            <div className="mt-14 mb-3 grid grid-cols-12 sm:gap-10 intro-y">
              <div className="col-span-12 sm:col-span-6 md:col-span-4 py-6 sm:pl-5 md:pl-0 lg:pl-5 relative text-center sm:text-left">
                <Dropdown className="absolute pt-0.5 2xl:pt-0 mt-5 2xl:mt-6 top-0 right-0">
                  <DropdownToggle tag="a" className="block" href="#">
                    <Lucide
                      icon="MoreVertical"
                      className="w-5 h-5 text-slate-500"
                    />
                  </DropdownToggle>
                  <DropdownMenu className="w-40">
                    <DropdownContent>
                      <DropdownItem>
                        <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                        Monthly Report
                      </DropdownItem>
                      <DropdownItem>
                        <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                        Annual Report
                      </DropdownItem>
                    </DropdownContent>
                  </DropdownMenu>
                </Dropdown>
                <div className="text-sm 2xl:text-base font-medium -mb-1">
                  Hi Ethan,
                  <span className="text-slate-600 dark:text-slate-300 font-normal">
                    welcome back!
                  </span>
                </div>
                <div className="text-base 2xl:text-lg justify-center sm:justify-start flex items-center text-slate-600 dark:text-slate-300 leading-3 mt-14 2xl:mt-24">
                  My Total Assets
                  <Tippy
                    tag="div"
                    content="Total value of your sales: $158.409.416"
                  >
                    <Lucide
                      icon="AlertCircle"
                      className="w-5 h-5 ml-1.5 mt-0.5"
                    />
                  </Tippy>
                </div>
                <div className="2xl:flex mt-5 mb-3">
                  <div className="flex items-center justify-center sm:justify-start">
                    <div className="relative text-2xl 2xl:text-3xl font-medium leading-6 pl-3 2xl:pl-4">
                      <span className="absolute text-xl 2xl:text-2xl top-0 left-0 -mt-1 2xl:mt-0">
                        $
                      </span>
                      142,402,210
                    </div>
                    <a className="text-slate-500 ml-4 2xl:ml-16" href="">
                      <Lucide icon="RefreshCcw" className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="mt-5 2xl:flex 2xl:justify-center 2xl:mt-0 2xl:-ml-20 2xl:w-14 2xl:flex-none 2xl:pl-2.5">
                    <Tippy
                      tag="div"
                      className="font-medium inline-flex bg-success text-white rounded-full px-2 py-1 text-xs 2xl:text-sm 2xl:p-0 2xl:text-success 2xl:bg-transparent 2xl:flex items-center cursor-pointer 2xl:justify-center"
                      content="49% Higher than last month"
                    >
                      49%
                      <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                    </Tippy>
                  </div>
                </div>
                <div className="text-slate-500">Last updated 1 hour ago</div>
                <div className="2xl:text-base text-slate-600 dark:text-slate-300 mt-6 -mb-1">
                  Total net margin
                  <a
                    href=""
                    className="underline decoration-dotted underline-offset-4 text-primary dark:text-slate-400"
                  >
                    $12,921,050
                  </a>
                </div>
                <Dropdown className="mt-14 2xl:mt-24">
                  <DropdownToggle className="btn btn-rounded-primary w-44 2xl:w-52 px-4 relative justify-start">
                    Download Reports
                    <span className="w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-1">
                      <Lucide icon="ChevronDown" className="w-4 h-4" />
                    </span>
                  </DropdownToggle>
                  <DropdownMenu className="w-44 2xl:w-52">
                    <DropdownContent>
                      <DropdownItem>
                        <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                        Monthly Report
                      </DropdownItem>
                      <DropdownItem>
                        <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                        Annual Report
                      </DropdownItem>
                    </DropdownContent>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="row-start-2 md:row-start-auto col-span-12 md:col-span-4 py-6 border-black border-opacity-10 border-t md:border-t-0 md:border-l md:border-r border-dashed px-10 sm:px-28 md:px-5 -mx-5">
                <div className="flex flex-wrap items-center">
                  <div className="flex items-center w-full sm:w-auto justify-center sm:justify-start mr-auto mb-5 2xl:mb-0">
                    <div className="w-2 h-2 bg-primary rounded-full -mt-4"></div>
                    <div className="ml-3.5">
                      <div className="relative text-xl 2xl:text-2xl font-medium leading-6 2xl:leading-5 pl-3.5 2xl:pl-4">
                        <span className="absolute text-base 2xl:text-xl top-0 left-0 2xl:-mt-1.5">
                          $
                        </span>
                        47,578.77
                      </div>
                      <div className="text-slate-500 mt-2">Yearly budget</div>
                    </div>
                  </div>
                  <select className="form-select bg-transparent border-black border-opacity-10 dark:border-darkmode-400 dark:bg-transparent mx-auto sm:mx-0 py-1.5 px-3 w-auto -mt-2">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="custom-date">Custom Date</option>
                  </select>
                </div>
                <div className="mt-10 text-slate-600 dark:text-slate-300">
                  You have spent about 35% of your annual budget.
                </div>
                <div className="mt-6">
                  <ReportBarChart1 height={290} />
                </div>
              </div>
              <TabGroup className="col-span-12 sm:col-span-6 md:col-span-4 py-6 border-black border-opacity-10 border-t sm:border-t-0 border-l md:border-l-0 border-dashed -ml-4 pl-4 md:ml-0 md:pl-0">
                <TabList className="nav-pills w-3/4 2xl:w-4/6 bg-slate-200 dark:bg-black/10 rounded-md mx-auto p-1">
                  <Tab className="w-full py-1.5 px-2" tag="button">
                    Active
                  </Tab>
                  <Tab className="w-full py-1.5 px-2" tag="button">
                    Inactive
                  </Tab>
                </TabList>
                <TabPanels className="mt-6">
                  <TabPanel>
                    <div className="relative mt-8">
                      <ReportDonutChart2 height={215} />
                      <div className="flex flex-col justify-center items-center absolute w-full h-full top-0 left-0">
                        <div className="text-xl 2xl:text-2xl font-medium">
                          2.501
                        </div>
                        <div className="text-slate-500 mt-0.5">
                          Active Users
                        </div>
                      </div>
                    </div>
                    <div className="mx-auto w-10/12 2xl:w-2/3 mt-8">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="truncate">17 - 30 Years old</span>
                        <span className="font-medium xl:ml-auto">62%</span>
                      </div>
                      <div className="flex items-center mt-4">
                        <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                        <span className="truncate">31 - 50 Years old</span>
                        <span className="font-medium xl:ml-auto">33%</span>
                      </div>
                      <div className="flex items-center mt-4">
                        <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                        <span className="truncate">&gt;= 50 Years old</span>
                        <span className="font-medium xl:ml-auto">10%</span>
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>
          </div>
          <div className="report-box-3 px-5 pt-8 pb-14 col-span-12 z-10">
            <div className="grid grid-cols-12 gap-6 relative intro-y">
              <div className="col-span-12 sm:col-span-4 xl:col-span-3 px-0 lg:px-6 xl:px-0 2xl:px-6">
                <div className="flex items-center flex-wrap lg:flex-nowrap gap-3">
                  <div className="sm:w-full lg:w-auto text-lg font-medium truncate mr-auto">
                    Summary Report
                  </div>
                  <div className="py-1 px-2.5 rounded-full text-xs bg-slate-300/50 dark:bg-darkmode-400 text-slate-600 dark:text-slate-300 cursor-pointer truncate">
                    180 Campaign
                  </div>
                </div>
                <div className="px-10 sm:px-0">
                  <SimpleLineChart3 height={110} className="-ml-1 mt-8 -mb-7" />
                </div>
              </div>
              <div className="col-span-12 sm:col-span-4 xl:col-span-3 px-0 lg:px-6 xl:px-0 2xl:px-6">
                <div className="flex items-center flex-wrap lg:flex-nowrap gap-3">
                  <div className="sm:w-full lg:w-auto text-lg font-medium truncate mr-auto">
                    Social Media
                  </div>
                  <a href="" className="flex items-center text-primary">
                    <div className="truncate 2xl:mr-auto">View Details</div>
                    <Lucide icon="ArrowRight" className="w-4 h-4 ml-3" />
                  </a>
                </div>
                <div className="flex items-center justify-center mt-10">
                  <div className="text-right">
                    <div className="text-3xl font-medium">149</div>
                    <div className="truncate mt-1 text-slate-500">
                      Active Lenders
                    </div>
                  </div>
                  <div className="w-px h-16 border border-r border-dashed border-slate-300 dark:border-darkmode-400 mx-4 xl:mx-6"></div>
                  <div>
                    <div className="text-3xl font-medium">135</div>
                    <div className="truncate mt-1 text-slate-500">
                      Total Lenders
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-4 xl:col-span-3 px-0 lg:px-6 xl:px-0 2xl:px-6">
                <div className="flex items-center flex-wrap lg:flex-nowrap gap-3">
                  <div className="sm:w-full lg:w-auto text-lg font-medium truncate mr-auto">
                    Posted Ads
                  </div>
                  <div className="py-1 px-2.5 rounded-full text-xs bg-slate-300/50 dark:bg-darkmode-400 text-slate-600 dark:text-slate-300 cursor-pointer truncate">
                    320 Followers
                  </div>
                </div>
                <div className="px-10 sm:px-0">
                  <SimpleLineChart4 height={110} className="-ml-1 mt-8 -mb-7" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="report-box-4 w-full h-full grid grid-cols-12 gap-6 xl:absolute -mt-8 xl:mt-0 pb-6 xl:pb-0 top-0 right-0 z-30 xl:z-auto">
          <div className="col-span-12 xl:col-span-3 xl:col-start-10 xl:pb-16 z-30">
            <div className="h-full flex flex-col">
              <div className="box p-5 mt-6 bg-primary intro-x">
                <div className="flex flex-wrap gap-3">
                  <div className="mr-auto">
                    <div className="text-white text-opacity-70 dark:text-slate-300 flex items-center leading-3">
                      AVAILABLE FUNDS
                      <Tippy
                        tag="div"
                        content="Total value of your sales: $158.409.416"
                      >
                        <Lucide icon="AlertCircle" className="w-4 h-4 ml-1.5" />
                      </Tippy>
                    </div>
                    <div className="text-white relative text-2xl font-medium leading-5 pl-4 mt-3.5">
                      <span className="absolute text-xl top-0 left-0 -mt-1.5">
                        $
                      </span>
                      479,578.77
                    </div>
                  </div>
                  <a
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-darkmode-300 bg-opacity-20 hover:bg-opacity-30 text-white"
                    href=""
                  >
                    <Lucide icon="Plus" className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div className="report-box-4__content xl:min-h-0 intro-x">
                <TabGroup className="max-h-full xl:overflow-y-auto box mt-5">
                  <div className="xl:sticky top-0 px-5 pt-5 pb-6">
                    <div className="flex items-center">
                      <div className="text-lg font-medium truncate mr-5">
                        Summary Report
                      </div>
                      <a
                        href=""
                        className="ml-auto flex items-center text-primary"
                      >
                        <Lucide icon="RefreshCcw" className="w-4 h-4 mr-3" />
                        Refresh
                      </a>
                    </div>
                    <TabList className="nav-pills border border-slate-300 dark:border-darkmode-300 border-dashed rounded-md mx-auto p-1 mt-5">
                      <Tab className="w-full py-1.5 px-2 active" tag="button">
                        Weekly
                      </Tab>
                      <Tab className="w-full py-1.5 px-2" tag="button">
                        Monthly
                      </Tab>
                    </TabList>
                  </div>
                  <TabPanels className="px-5 pb-5">
                    <TabPanel className="grid grid-cols-12 gap-y-6">
                      <div className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12">
                        <div className="text-slate-500">Unpaid Loan</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-lg">$155.430.000</div>
                          <Tippy
                            tag="div"
                            className="text-danger flex text-xs font-medium cursor-pointer ml-2"
                            content="2% Lower than last month"
                          >
                            2%
                            <Lucide
                              icon="ChevronDown"
                              className="w-4 h-4 ml-0.5"
                            />
                          </Tippy>
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12">
                        <div className="text-slate-500">
                          Active Funding Partner
                        </div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-lg">52 Partner</div>
                          <Tippy
                            tag="div"
                            className="text-success flex text-xs font-medium tooltip cursor-pointer ml-2"
                            content="0.1% Lower than last month"
                          >
                            49%
                            <Lucide
                              icon="ChevronUp"
                              className="w-4 h-4 ml-0.5"
                            />
                          </Tippy>
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12">
                        <div className="text-slate-500">Paid Installment</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-lg">$75.430.000</div>
                          <Tippy
                            tag="div"
                            className="text-success flex text-xs font-medium tooltip cursor-pointer ml-2"
                            content="49% Higher than last month"
                          >
                            36%
                            <Lucide
                              icon="ChevronUp"
                              className="w-4 h-4 ml-0.5"
                            />
                          </Tippy>
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12">
                        <div className="text-slate-500">Success Payment</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-lg">100%</div>
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12">
                        <div className="text-slate-500">
                          Waiting For Disbursement
                        </div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-lg">0</div>
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12">
                        <div className="text-slate-500">Unpaid Loan</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-lg">$21.430.000</div>
                          <Tippy
                            tag="div"
                            className="text-danger flex text-xs font-medium cursor-pointer ml-2"
                            content="2% Lower than last month"
                          >
                            23%
                            <Lucide
                              icon="ChevronDown"
                              className="w-4 h-4 ml-0.5"
                            />
                          </Tippy>
                        </div>
                      </div>
                      <button className="btn btn-outline-secondary col-span-12 border-slate-300 dark:border-darkmode-300 border-dashed relative justify-start mb-2">
                        <span className="truncate mr-5">
                          My Portfolio Details
                        </span>
                        <span className="w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-0.5">
                          <Lucide icon="ArrowRight" className="w-4 h-4" />
                        </span>
                      </button>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="report-box-3 report-box-3--content grid grid-cols-12 gap-6 xl:-mt-5 2xl:-mt-8 -mb-10 z-40 2xl:z-10">
        <div className="col-span-12 2xl:col-span-9">
          <div className="grid grid-cols-12 gap-6">
            {/* BEGIN: Official Store */}
            <div className="col-span-12 xl:col-span-8 mt-6">
              <div className="intro-y block sm:flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  Official Store
                </h2>
                <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
                  <Lucide
                    icon="MapPin"
                    className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
                  />
                  <input
                    type="text"
                    className="form-control sm:w-56 box pl-10"
                    placeholder="Filter by city"
                  />
                </div>
              </div>
              <div className="intro-y box p-5 mt-12 sm:mt-5">
                <div>
                  250 Official stores in 21 countries, click the marker to see
                  location details.
                </div>
                <ReportMap className="report-maps mt-5 bg-slate-200 rounded-md" />
              </div>
            </div>
            {/* END: Official Store */}
            {/* BEGIN: Weekly Best Sellers */}
            <div className="col-span-12 xl:col-span-4 mt-6">
              <div className="intro-y flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  Weekly Best Sellers
                </h2>
              </div>
              <div className="mt-5">
                {$_.take($f(), 4).map((faker, fakerKey) => (
                  <div key={fakerKey} className="intro-y">
                    <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                      <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                        <img
                          alt="Alpha - Evolutive CRM"
                          src={faker.photos[0]}
                        />
                      </div>
                      <div className="ml-4 mr-auto">
                        <div className="font-medium">{faker.customers[0].name}</div>
                        <div className="text-slate-500 text-xs mt-0.5">
                          {faker.dates[0]}
                        </div>
                      </div>
                      <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                        137 Sales
                      </div>
                    </div>
                  </div>
                ))}
                <a
                  href=""
                  className="intro-y w-full block text-center rounded-md py-4 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                >
                  View More
                </a>
              </div>
            </div>
            {/* END: Weekly Best Sellers */}
            {/* BEGIN: Weekly Top Products */}
            <div className="col-span-12 mt-6">
              <div className="intro-y block sm:flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  Weekly Top Products
                </h2>
                <div className="flex items-center sm:ml-auto mt-3 sm:mt-0">
                  <button className="btn box flex items-center text-slate-600 dark:text-slate-300">
                    <Lucide
                      icon="FileText"
                      className="hidden sm:block w-4 h-4 mr-2"
                    />
                    Export to Excel
                  </button>
                  <button className="ml-3 btn box flex items-center text-slate-600 dark:text-slate-300">
                    <Lucide
                      icon="FileText"
                      className="hidden sm:block w-4 h-4 mr-2"
                    />
                    Export to PDF
                  </button>
                </div>
              </div>
              <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
                <table className="table table-report sm:mt-2">
                  <thead>
                    <tr>
                      <th className="whitespace-nowrap">IMAGES</th>
                      <th className="whitespace-nowrap">PRODUCT NAME</th>
                      <th className="text-center whitespace-nowrap">STOCK</th>
                      <th className="text-center whitespace-nowrap">STATUS</th>
                      <th className="text-center whitespace-nowrap">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {$_.take($f(), 4).map((faker, fakerKey) => (
                      <tr key={fakerKey} className="intro-x">
                        <td className="w-40">
                          <div className="flex">
                            <div className="w-10 h-10 image-fit zoom-in">
                              <Tippy
                                tag="img"
                                alt="Alpha - Evolutive CRM"
                                className="rounded-full"
                                src={faker.images[0]}
                                content={`Uploaded at ${faker.dates[0]}`}
                              />
                            </div>
                            <div className="w-10 h-10 image-fit zoom-in -ml-5">
                              <Tippy
                                tag="img"
                                alt="Alpha - Evolutive CRM"
                                className="rounded-full"
                                src={faker.images[1]}
                                content={`Uploaded at ${faker.dates[1]}`}
                              />
                            </div>
                            <div className="w-10 h-10 image-fit zoom-in -ml-5">
                              <Tippy
                                tag="img"
                                alt="Alpha - Evolutive CRM"
                                className="rounded-full"
                                src={faker.images[2]}
                                content={`Uploaded at ${faker.dates[2]}`}
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <a href="" className="font-medium whitespace-nowrap">
                            {faker.products[0].name}
                          </a>
                          <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                            {faker.products[0].category}
                          </div>
                        </td>
                        <td className="text-center">{faker.stocks[0]}</td>
                        <td className="w-40">
                          <div
                            className={classnames({
                              "flex items-center justify-center": true,
                              "text-success": faker.trueFalse[0],
                              "text-danger": !faker.trueFalse[0],
                            })}
                          >
                            <Lucide
                              icon="CheckSquare"
                              className="w-4 h-4 mr-2"
                            />
                            {faker.trueFalse[0] ? "Active" : "Inactive"}
                          </div>
                        </td>
                        <td className="table-report__action w-56">
                          <div className="flex justify-center items-center">
                            <a className="flex items-center mr-3" href="">
                              <Lucide
                                icon="CheckSquare"
                                className="w-4 h-4 mr-1"
                              />
                              Edit
                            </a>
                            <a
                              className="flex items-center text-danger"
                              href=""
                            >
                              <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                              Delete
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-3">
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
            </div>
            {/* END: Weekly Top Products */}
          </div>
        </div>
        <div className="col-span-12 2xl:col-span-3 relative z-10">
          <div className="2xl:border-l pb-10 intro-y">
            <div className="2xl:pl-6 grid grid-cols-12 gap-x-6 2xl:gap-x-0 gap-y-6">
              {/* BEGIN: Recent Activities */}
              <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3">
                <div className="intro-x flex items-center h-10">
                  <h2 className="text-lg font-medium truncate mr-5">
                    Recent Activities
                  </h2>
                  <a href="" className="ml-auto text-primary truncate">
                    Show More
                  </a>
                </div>
                <div className="mt-5 relative before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5">
                  <div className="intro-x relative flex items-center mb-3">
                    <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                      <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                        <img
                          alt="Alpha - Evolutive CRM"
                          src={$f()[6].photos[0]}
                        />
                      </div>
                    </div>
                    <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                      <div className="flex items-center">
                        <div className="font-medium">
                          {$f()[11].customers[0].name}
                        </div>
                        <div className="text-xs text-slate-500 ml-auto">
                          07:00 PM
                        </div>
                      </div>
                      <div className="text-slate-500 mt-1">
                        Has joined the team
                      </div>
                    </div>
                  </div>
                  <div className="intro-x relative flex items-center mb-3">
                    <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                      <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                        <img
                          alt="Alpha - Evolutive CRM"
                          src={$f()[8].photos[0]}
                        />
                      </div>
                    </div>
                    <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                      <div className="flex items-center">
                        <div className="font-medium">
                          {$f()[12].customers[0].name}
                        </div>
                        <div className="text-xs text-slate-500 ml-auto">
                          07:00 PM
                        </div>
                      </div>
                      <div className="text-slate-500">
                        <div className="mt-1">Added 3 new photos</div>
                        <div className="flex mt-2">
                          <Tippy
                            tag="div"
                            className="w-8 h-8 image-fit mr-1 zoom-in"
                            content={$f()[0].products[0].name}
                          >
                            <img
                              alt="Alpha - Evolutive CRM"
                              className="rounded-md border border-white"
                              src={$f()[8].images[0]}
                            />
                          </Tippy>
                          <Tippy
                            tag="div"
                            className="w-8 h-8 image-fit mr-1 zoom-in"
                            content={$f()[1].products[0].name}
                          >
                            <img
                              alt="Alpha - Evolutive CRM"
                              className="rounded-md border border-white"
                              src={$f()[8].images[1]}
                            />
                          </Tippy>
                          <Tippy
                            tag="div"
                            className="w-8 h-8 image-fit mr-1 zoom-in"
                            content={$f()[2].products[0].name}
                          >
                            <img
                              alt="Alpha - Evolutive CRM"
                              className="rounded-md border border-white"
                              src={$f()[8].images[2]}
                            />
                          </Tippy>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="intro-x text-slate-500 text-xs text-center my-4">
                    12 November
                  </div>
                  <div className="intro-x relative flex items-center mb-3">
                    <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                      <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                        <img
                          alt="Alpha - Evolutive CRM"
                          src={$f()[4].photos[0]}
                        />
                      </div>
                    </div>
                    <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                      <div className="flex items-center">
                        <div className="font-medium">
                          {$f()[7].customers[0].name}
                        </div>
                        <div className="text-xs text-slate-500 ml-auto">
                          07:00 PM
                        </div>
                      </div>
                      <div className="text-slate-500 mt-1">
                        Has changed{" "}
                        <a className="text-primary" href="">
                          {$f()[7].products[0].name}
                        </a>{" "}
                        price and description
                      </div>
                    </div>
                  </div>
                  <div className="intro-x relative flex items-center mb-3">
                    <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                      <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                        <img
                          alt="Alpha - Evolutive CRM"
                          src={$f()[1].photos[0]}
                        />
                      </div>
                    </div>
                    <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                      <div className="flex items-center">
                        <div className="font-medium">
                          {$f()[6].customers[0].name}
                        </div>
                        <div className="text-xs text-slate-500 ml-auto">
                          07:00 PM
                        </div>
                      </div>
                      <div className="text-slate-500 mt-1">
                        Has changed{" "}
                        <a className="text-primary" href="">
                          {$f()[6].products[0].name}
                        </a>{" "}
                        description
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* END: Recent Activities */}
              {/* BEGIN: Transactions */}
              <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3">
                <div className="intro-x flex items-center h-10">
                  <h2 className="text-lg font-medium truncate mr-5">
                    Transactions
                  </h2>
                </div>
                <div className="mt-5">
                  {$_.take($f(), 5).map((faker, fakerKey) => (
                    <div key={fakerKey} className="intro-x">
                      <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                        <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                          <img
                            alt="Alpha - Evolutive CRM"
                            src="/src/assets/images/profile.png"
                          />
                        </div>
                        <div className="ml-4 mr-auto">
                          <div className="font-medium">
                            {faker.users[0].name}
                          </div>
                          <div className="text-slate-500 text-xs mt-0.5">
                            {faker.dates[0]}
                          </div>
                        </div>
                        <div
                          className={classnames({
                            "text-success": faker.trueFalse[0],
                            "text-danger": !faker.trueFalse[0],
                          })}
                        >
                          {faker.trueFalse[0] ? "+" : "-"}${faker.totals[0]}
                        </div>
                      </div>
                    </div>
                  ))}
                  <a
                    href=""
                    className="intro-x w-full block text-center rounded-md py-3 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                  >
                    View More
                  </a>
                </div>
              </div>
              {/* END: Transactions */}
            </div>
          </div>
        </div>
      </div>
      {/* BEGIN: General Report */}
      <div className="col-span-12 mt-8">
        <div className="intro-y flex items-center h-10">
          <h2 className="text-lg font-medium truncate mr-5">
            General Report
          </h2>
          <a href="" className="ml-auto flex items-center text-primary">
            <Lucide icon="RefreshCcw" className="w-4 h-4 mr-3" /> Reload
            Data
          </a>
        </div>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div className="report-box zoom-in">
              <div className="box p-5">
                <div className="flex">
                  <Lucide
                    icon="ShoppingCart"
                    className="report-box__icon text-primary"
                  />
                  <div className="ml-auto">
                    <Tippy
                      tag="div"
                      className="report-box__indicator bg-success cursor-pointer"
                      content="33% Higher than last month"
                    >
                      33%
                      <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                    </Tippy>
                  </div>
                </div>
                <div className="text-3xl font-medium leading-8 mt-6">
                  4.710
                </div>
                <div className="text-base text-slate-500 mt-1">
                  Item Sales
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div className="report-box zoom-in">
              <div className="box p-5">
                <div className="flex">
                  <Lucide
                    icon="CreditCard"
                    className="report-box__icon text-pending"
                  />
                  <div className="ml-auto">
                    <Tippy
                      tag="div"
                      className="report-box__indicator bg-danger cursor-pointer"
                      content="2% Lower than last month"
                    >
                      2%
                      <Lucide
                        icon="ChevronDown"
                        className="w-4 h-4 ml-0.5"
                      />
                    </Tippy>
                  </div>
                </div>
                <div className="text-3xl font-medium leading-8 mt-6">
                  3.721
                </div>
                <div className="text-base text-slate-500 mt-1">
                  New Orders
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div className="report-box zoom-in">
              <div className="box p-5">
                <div className="flex">
                  <Lucide
                    icon="Monitor"
                    className="report-box__icon text-warning"
                  />
                  <div className="ml-auto">
                    <Tippy
                      tag="div"
                      className="report-box__indicator bg-success cursor-pointer"
                      content="12% Higher than last month"
                    >
                      12%{" "}
                      <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                    </Tippy>
                  </div>
                </div>
                <div className="text-3xl font-medium leading-8 mt-6">
                  2.149
                </div>
                <div className="text-base text-slate-500 mt-1">
                  Total Products
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div className="report-box zoom-in">
              <div className="box p-5">
                <div className="flex">
                  <Lucide
                    icon="User"
                    className="report-box__icon text-success"
                  />
                  <div className="ml-auto">
                    <Tippy
                      tag="div"
                      className="report-box__indicator bg-success cursor-pointer"
                      content="22% Higher than last month"
                    >
                      22%{" "}
                      <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                    </Tippy>
                  </div>
                </div>
                <div className="text-3xl font-medium leading-8 mt-6">
                  152.040
                </div>
                <div className="text-base text-slate-500 mt-1">
                  Unique Visitor
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END: General Report */}
      <div className="col-span-12 2xl:col-span-9">
        <div className="grid grid-cols-12 gap-6">
          {/* BEGIN: Notification */}
          <div className="col-span-12 mt-6 -mb-6 intro-y">
            <Alert className="box bg-primary text-white flex items-center mb-6">
              {({ dismiss }) => (
                <>
                  <span>
                    Introducing new dashboard! Download now at
                    <a
                      href="https://alpha-crm.online/update3.1"
                      className="underline ml-1"
                      target="blank"
                    >
                      Alpha-crm.online
                    </a>
                    .
                  </span>
                  <button
                    type="button"
                    className="btn-close text-white"
                    onClick={dismiss}
                    aria-label="Close"
                  >
                    <Lucide icon="X" className="w-4 h-4" />
                  </button>
                </>
              )}
            </Alert>
          </div>
          {/* BEGIN: Notification */}
          {/* BEGIN: General Report */}
          <div className="col-span-12 lg:col-span-8 xl:col-span-6 mt-2">
            <div className="intro-y block sm:flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                General Report
              </h2>
              <select className="sm:ml-auto mt-3 sm:mt-0 sm:w-auto form-select box">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="custom-date">Custom Date</option>
              </select>
            </div>
            <div className="report-box-2 intro-y mt-12 sm:mt-5">
              <div className="box sm:flex">
                <div className="px-8 py-12 flex flex-col justify-center flex-1">
                  <Lucide
                    icon="ShoppingBag"
                    className="w-10 h-10 text-warning"
                  />
                  <div className="relative text-3xl font-medium mt-12 pl-4 ml-0.5">
                    <span className="absolute text-2xl font-medium top-0 left-0 -ml-0.5">
                      $
                    </span>
                    54.143
                  </div>
                  <Tippy
                    tag="div"
                    className="report-box-2__indicator bg-success cursor-pointer"
                    content="47% Higher than last month"
                  >
                    47% <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </Tippy>
                  <div className="mt-4 text-slate-500">
                    Sales earnings this month after associated author fees, &
                    before taxes.
                  </div>
                  <button className="btn btn-outline-secondary relative justify-start rounded-full mt-12">
                    Download Reports
                    <span className="w-8 h-8 absolute flex justify-center items-center bg-primary text-white rounded-full right-0 top-0 bottom-0 my-auto ml-auto mr-0.5">
                      <Lucide icon="ArrowRight" className="w-4 h-4" />
                    </span>
                  </button>
                </div>
                <div className="px-8 py-12 flex flex-col justify-center flex-1 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-darkmode-300 border-dashed">
                  <div className="text-slate-500 text-xs">
                    TOTAL TRANSACTION
                  </div>
                  <div className="mt-1.5 flex items-center">
                    <div className="text-base">4.501</div>
                    <Tippy
                      tag="div"
                      className="text-danger flex text-xs font-medium cursor-pointer ml-2"
                      content="2% Lower than last month"
                    >
                      2%
                      <Lucide icon="ChevronDown" className="w-4 h-4 ml-0.5" />
                    </Tippy>
                  </div>
                  <div className="text-slate-500 text-xs mt-5">
                    CANCELATION CASE
                  </div>
                  <div className="mt-1.5 flex items-center">
                    <div className="text-base">2</div>
                    <Tippy
                      tag="div"
                      className="text-danger flex text-xs font-medium cursor-pointer ml-2"
                      content="0.1% Lower than last month"
                    >
                      0.1%
                      <Lucide icon="ChevronDown" className="w-4 h-4 ml-0.5" />
                    </Tippy>
                  </div>
                  <div className="text-slate-500 text-xs mt-5">
                    GROSS RENTAL VALUE
                  </div>
                  <div className="mt-1.5 flex items-center">
                    <div className="text-base">$72.000</div>
                    <Tippy
                      tag="div"
                      className="text-success flex text-xs font-medium cursor-pointer ml-2"
                      content="49% Higher than last month"
                    >
                      49%{" "}
                      <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                    </Tippy>
                  </div>
                  <div className="text-slate-500 text-xs mt-5">
                    GROSS RENTAL PROFIT
                  </div>
                  <div className="mt-1.5 flex items-center">
                    <div className="text-base">$54.000</div>
                    <Tippy
                      tag="div"
                      className="text-success flex text-xs font-medium cursor-pointer ml-2"
                      content="52% Higher than last month"
                    >
                      52%{" "}
                      <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                    </Tippy>
                  </div>
                  <div className="text-slate-500 text-xs mt-5">NEW USERS</div>
                  <div className="mt-1.5 flex items-center">
                    <div className="text-base">2.500</div>
                    <Tippy
                      tag="div"
                      className="text-success flex text-xs font-medium tooltip cursor-pointer ml-2"
                      content="52% Higher than last month"
                    >
                      52%{" "}
                      <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                    </Tippy>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: General Report */}
          {/* BEGIN: Sales Report */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
            <div className="intro-y flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                Sales Report
              </h2>
              <a href="" className="ml-auto text-primary truncate">
                Show More
              </a>
            </div>
            <div className="intro-y box p-5 mt-5">
              <div className="mt-3">
                <ReportDonutChart height={213} />
              </div>
              <div className="w-52 sm:w-auto mx-auto mt-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="truncate">17 - 30 Years old</span>
                  <span className="font-medium ml-auto">62%</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                  <span className="truncate">31 - 50 Years old</span>
                  <span className="font-medium ml-auto">33%</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                  <span className="truncate">&gt;= 50 Years old</span>
                  <span className="font-medium ml-auto">10%</span>
                </div>
              </div>
            </div>
          </div>
          {/* END: Sales Report */}
          {/* BEGIN: Visitors */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 mt-2">
            <div className="intro-y flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">Visitors</h2>
              <a href="" className="ml-auto text-primary truncate">
                View on Map
              </a>
            </div>
            <div className="report-box-2 intro-y mt-5">
              <div className="box p-5">
                <div className="flex items-center">
                  Realtime active users
                  <Dropdown className="ml-auto">
                    <DropdownToggle
                      tag="a"
                      className="w-5 h-5 block -mr-2"
                      href="#"
                    >
                      <Lucide
                        icon="MoreVertical"
                        className="w-5 h-5 text-slate-500"
                      />
                    </DropdownToggle>
                    <DropdownMenu className="w-40">
                      <DropdownContent>
                        <DropdownItem>
                          <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                          Export
                        </DropdownItem>
                        <DropdownItem>
                          <Lucide icon="Settings" className="w-4 h-4 mr-2" />
                          Settings
                        </DropdownItem>
                      </DropdownContent>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="text-2xl font-medium mt-2">214</div>
                <div className="border-b border-slate-200 flex pb-2 mt-4">
                  <div className="text-slate-500 text-xs">
                    Page views per second
                  </div>
                  <Tippy
                    tag="div"
                    className="text-success flex text-xs font-medium cursor-pointer ml-auto"
                    content="49% Lower than last month"
                  >
                    49% <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </Tippy>
                </div>
                <div className="mt-2 border-b broder-slate-200">
                  <div className="-mb-1.5 -ml-2.5">
                    <ReportBarChart height={79} />
                  </div>
                </div>
                <div className="text-slate-500 text-xs border-b border-slate-200 flex mb-2 pb-2 mt-4">
                  <div>Top Active Pages</div>
                  <div className="ml-auto">Active Users</div>
                </div>
                <div className="flex">
                  <div>/letz-lara…review/2653</div>
                  <div className="ml-auto">472</div>
                </div>
                <div className="flex mt-1.5">
                  <div>/midone…review/1674</div>
                  <div className="ml-auto">294</div>
                </div>
                <div className="flex mt-1.5">
                  <div>/profile…review/46789</div>
                  <div className="ml-auto">83</div>
                </div>
                <div className="flex mt-1.5">
                  <div>/profile…review/24357</div>
                  <div className="ml-auto">21</div>
                </div>
                <button className="btn btn-outline-secondary border-dashed w-full py-1 px-2 mt-4">
                  Real-Time Report
                </button>
              </div>
            </div>
          </div>
          {/* END: Visitors */}
        </div>
      </div>
      {/* BEGIN: Official Store */}
      <div className="col-span-12 xl:col-span-8 mt-6">
        <div className="intro-y block sm:flex items-center h-10">
          <h2 className="text-lg font-medium truncate mr-5">
            Official Store
          </h2>
          <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
            <Lucide
              icon="MapPin"
              className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
            />
            <input
              type="text"
              className="form-control sm:w-56 box pl-10"
              placeholder="Filter by city"
            />
          </div>
        </div>
        <div className="intro-y box p-5 mt-12 sm:mt-5">
          <div>
            250 Official stores in 21 countries, click the marker to see
            location details.
          </div>
          <ReportMap className="report-maps mt-5 bg-slate-200 rounded-md" />
        </div>
      </div>
      {/* END: Official Store */}
      {/* BEGIN: Weekly Best Sellers */}
      <div className="col-span-12 xl:col-span-4 mt-6">
        <div className="intro-y flex items-center h-10">
          <h2 className="text-lg font-medium truncate mr-5">
            Weekly Best Sellers
          </h2>
        </div>
        <div className="mt-5">
          {$_.take($f(), 4).map((faker, fakerKey) => (
            <div key={fakerKey} className="intro-y">
              <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                  <img
                    alt="Alpha - Evolutive CRM"
                    src={faker.photos[0]}
                  />
                </div>
                <div className="ml-4 mr-auto">
                  <div className="font-medium">{faker.customers[0].name}</div>
                  <div className="text-slate-500 text-xs mt-0.5">
                    {faker.dates[0]}
                  </div>
                </div>
                <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                  137 Sales
                </div>
              </div>
            </div>
          ))}
          <a
            href=""
            className="intro-y w-full block text-center rounded-md py-4 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
          >
            View More
          </a>
        </div>
      </div>
      {/* END: Weekly Best Sellers */}
      {/* BEGIN: General Report */}
      <div className="col-span-12 grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
          <div className="box p-5 zoom-in">
            <div className="flex items-center">
              <div className="w-2/4 flex-none">
                <div className="text-lg font-medium truncate">
                  Target Sales
                </div>
                <div className="text-slate-500 mt-1">300 Sales</div>
              </div>
              <div className="flex-none ml-auto relative">
                <ReportDonutChart1 width={90} height={90} />
                <div className="font-medium absolute w-full h-full flex items-center justify-center top-0 left-0">
                  20%
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
          <div className="box p-5 zoom-in">
            <div className="flex">
              <div className="text-lg font-medium truncate mr-3">
                Social Media
              </div>
              <div className="py-1 px-2 flex items-center rounded-full text-xs bg-slate-100 dark:bg-darkmode-400 text-slate-500 cursor-pointer ml-auto truncate">
                320 Followers
              </div>
            </div>
            <div className="mt-1">
              <SimpleLineChart1 height={58} className="-ml-1" />
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
          <div className="box p-5 zoom-in">
            <div className="flex items-center">
              <div className="w-2/4 flex-none">
                <div className="text-lg font-medium truncate">
                  New Products
                </div>
                <div className="text-slate-500 mt-1">1450 Products</div>
              </div>
              <div className="flex-none ml-auto relative">
                <ReportDonutChart1 width={90} height={90} />
                <div className="font-medium absolute w-full h-full flex items-center justify-center top-0 left-0">
                  45%
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
          <div className="box p-5 zoom-in">
            <div className="flex">
              <div className="text-lg font-medium truncate mr-3">
                Posted Ads
              </div>
              <div className="py-1 px-2 flex items-center rounded-full text-xs bg-slate-100 dark:bg-darkmode-400 text-slate-500 cursor-pointer ml-auto truncate">
                180 Campaign
              </div>
            </div>
            <div className="mt-1">
              <SimpleLineChart1 height={58} className="-ml-1" />
            </div>
          </div>
        </div>
      </div>
      {/* END: General Report */}
      {/* BEGIN: Weekly Top Products */}
      <div className="col-span-12 mt-6">
        <div className="intro-y block sm:flex items-center h-10">
          <h2 className="text-lg font-medium truncate mr-5">
            Weekly Top Products
          </h2>
          <div className="flex items-center sm:ml-auto mt-3 sm:mt-0">
            <button className="btn box flex items-center text-slate-600 dark:text-slate-300">
              <Lucide
                icon="FileText"
                className="hidden sm:block w-4 h-4 mr-2"
              />
              Export to Excel
            </button>
            <button className="ml-3 btn box flex items-center text-slate-600 dark:text-slate-300">
              <Lucide
                icon="FileText"
                className="hidden sm:block w-4 h-4 mr-2"
              />
              Export to PDF
            </button>
          </div>
        </div>
        <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
          <table className="table table-report sm:mt-2">
            <thead>
              <tr>
                <th className="whitespace-nowrap">IMAGES</th>
                <th className="whitespace-nowrap">PRODUCT NAME</th>
                <th className="text-center whitespace-nowrap">STOCK</th>
                <th className="text-center whitespace-nowrap">STATUS</th>
                <th className="text-center whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {$_.take($f(), 4).map((faker, fakerKey) => (
                <tr key={fakerKey} className="intro-x">
                  <td className="w-40">
                    <div className="flex">
                      <div className="w-10 h-10 image-fit zoom-in">
                        <Tippy
                          tag="img"
                          alt="Alpha - Evolutive CRM"
                          className="rounded-full"
                          src={faker.images[0]}
                          content={`Uploaded at ${faker.dates[0]}`}
                        />
                      </div>
                      <div className="w-10 h-10 image-fit zoom-in -ml-5">
                        <Tippy
                          tag="img"
                          alt="Alpha - Evolutive CRM"
                          className="rounded-full"
                          src={faker.images[1]}
                          content={`Uploaded at ${faker.dates[1]}`}
                        />
                      </div>
                      <div className="w-10 h-10 image-fit zoom-in -ml-5">
                        <Tippy
                          tag="img"
                          alt="Alpha - Evolutive CRM"
                          className="rounded-full"
                          src={faker.images[2]}
                          content={`Uploaded at ${faker.dates[2]}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href="" className="font-medium whitespace-nowrap">
                      {faker.products[0].name}
                    </a>
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {faker.products[0].category}
                    </div>
                  </td>
                  <td className="text-center">{faker.stocks[0]}</td>
                  <td className="w-40">
                    <div
                      className={classnames({
                        "flex items-center justify-center": true,
                        "text-success": faker.trueFalse[0],
                        "text-danger": !faker.trueFalse[0],
                      })}
                    >
                      <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                      {faker.trueFalse[0] ? "Active" : "Inactive"}
                    </div>
                  </td>
                  <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                      <a className="flex items-center mr-3" href="">
                        <Lucide
                          icon="CheckSquare"
                          className="w-4 h-4 mr-1"
                        />
                        Edit
                      </a>
                      <a className="flex items-center text-danger" href="">
                        <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-3">
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
      </div>
      {/* END: Weekly Top Products */}

      {/* BEGIN: Schedules */}
      <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 xl:col-start-1 xl:row-start-2 2xl:col-start-auto 2xl:row-start-auto mt-3">
        <div className="intro-x flex items-center h-10">
          <h2 className="text-lg font-medium truncate mr-5">Schedules</h2>
          <a
            href=""
            className="ml-auto text-primary truncate flex items-center"
          >
            <Lucide icon="Plus" className="w-4 h-4 mr-1" /> Add New
            Schedules
          </a>
        </div>
        <div className="mt-5">
          <div className="intro-x box">
            <div className="p-5">
              <div className="flex">
                <Lucide
                  icon="ChevronLeft"
                  className="w-5 h-5 text-slate-500"
                />
                <div className="font-medium text-base mx-auto">April</div>
                <Lucide
                  icon="ChevronRight"
                  className="w-5 h-5 text-slate-500"
                />
              </div>
              <div className="grid grid-cols-7 gap-4 mt-5 text-center">
                <div className="font-medium">Su</div>
                <div className="font-medium">Mo</div>
                <div className="font-medium">Tu</div>
                <div className="font-medium">We</div>
                <div className="font-medium">Th</div>
                <div className="font-medium">Fr</div>
                <div className="font-medium">Sa</div>
                <div className="py-0.5 rounded relative text-slate-500">
                  29
                </div>
                <div className="py-0.5 rounded relative text-slate-500">
                  30
                </div>
                <div className="py-0.5 rounded relative text-slate-500">
                  31
                </div>
                <div className="py-0.5 rounded relative">1</div>
                <div className="py-0.5 rounded relative">2</div>
                <div className="py-0.5 rounded relative">3</div>
                <div className="py-0.5 rounded relative">4</div>
                <div className="py-0.5 rounded relative">5</div>
                <div className="py-0.5 bg-success/20 dark:bg-success/30 rounded relative">
                  6
                </div>
                <div className="py-0.5 rounded relative">7</div>
                <div className="py-0.5 bg-primary text-white rounded relative">
                  8
                </div>
                <div className="py-0.5 rounded relative">9</div>
                <div className="py-0.5 rounded relative">10</div>
                <div className="py-0.5 rounded relative">11</div>
                <div className="py-0.5 rounded relative">12</div>
                <div className="py-0.5 rounded relative">13</div>
                <div className="py-0.5 rounded relative">14</div>
                <div className="py-0.5 rounded relative">15</div>
                <div className="py-0.5 rounded relative">16</div>
                <div className="py-0.5 rounded relative">17</div>
                <div className="py-0.5 rounded relative">18</div>
                <div className="py-0.5 rounded relative">19</div>
                <div className="py-0.5 rounded relative">20</div>
                <div className="py-0.5 rounded relative">21</div>
                <div className="py-0.5 rounded relative">22</div>
                <div className="py-0.5 bg-pending/20 dark:bg-pending/30 rounded relative">
                  23
                </div>
                <div className="py-0.5 rounded relative">24</div>
                <div className="py-0.5 rounded relative">25</div>
                <div className="py-0.5 rounded relative">26</div>
                <div className="py-0.5 bg-primary/10 dark:bg-primary/50 rounded relative">
                  27
                </div>
                <div className="py-0.5 rounded relative">28</div>
                <div className="py-0.5 rounded relative">29</div>
                <div className="py-0.5 rounded relative">30</div>
                <div className="py-0.5 rounded relative text-slate-500">
                  1
                </div>
                <div className="py-0.5 rounded relative text-slate-500">
                  2
                </div>
                <div className="py-0.5 rounded relative text-slate-500">
                  3
                </div>
                <div className="py-0.5 rounded relative text-slate-500">
                  4
                </div>
                <div className="py-0.5 rounded relative text-slate-500">
                  5
                </div>
                <div className="py-0.5 rounded relative text-slate-500">
                  6
                </div>
                <div className="py-0.5 rounded relative text-slate-500">
                  7
                </div>
                <div className="py-0.5 rounded relative text-slate-500">
                  8
                </div>
                <div className="py-0.5 rounded relative text-slate-500">
                  9
                </div>
              </div>
            </div>
            <div className="border-t border-slate-200/60 p-5">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                <span className="truncate">UI/UX Workshop</span>
                <span className="font-medium xl:ml-auto">23th</span>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                <span className="truncate">
                  VueJs Frontend Development
                </span>
                <span className="font-medium xl:ml-auto">10th</span>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                <span className="truncate">Laravel Rest API</span>
                <span className="font-medium xl:ml-auto">31th</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END: Schedules */}
      {/* BEGIN: Page Layout */}

      {/* END: Page Layout */}
    </>
  );
}

export default Dashboard;
