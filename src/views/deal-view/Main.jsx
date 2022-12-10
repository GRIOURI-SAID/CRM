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

function Main() {
  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Deal View</h2>
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
                  src="/src/assets/images/profile.png"
                />
              </div>
              <div className="ml-4 mr-auto">
                <div className="font-medium text-base">
                  {$f()[0].products[0].name}
                </div>
                <div className="text-slate-500">{$f()[0].users[0].name}</div>
              </div>
              <Dropdown>
                <DropdownToggle tag="a" className="w-5 h-5 block" href="#">
                  <Lucide
                    icon="MoreHorizontal"
                    className="w-5 h-5 text-slate-500"
                  />
                </DropdownToggle>
                <DropdownMenu className="w-56">
                  <DropdownContent>
                    <DropdownHeader>Options</DropdownHeader>
                    <DropdownDivider />
                    <DropdownItem>
                      <Lucide icon="MessageCircle" className="w-4 h-4 mr-2" /> Send
                      Message
                    </DropdownItem>
                    <DropdownItem>
                      <Lucide icon="Phone" className="w-4 h-4 mr-2" /> Call
                    </DropdownItem>
                    <DropdownItem>
                      <Lucide icon="Mail" className="w-4 h-4 mr-2" />
                      Send Mail
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownFooter>
                      <button
                        type="button"
                        className="btn btn-secondary py-1 px-2"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger py-1 px-2 ml-auto"
                      >
                        Delete
                      </button>
                    </DropdownFooter>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
              <h1 className="text-slate-900 dark:text-slate-900 mt-2">Description</h1>
              <div className="text-slate-600 dark:text-slate-500 mt-2">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever. <br />
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry since the 1500s.
              </div>
            </div>
          </div>
          {/* BEGIN: Tasks In Progress */}
          <div className="intro-y box col-span-12 2xl:col-span-6 mt-5">
            <div className="flex items-center px-5 py-5 sm:py-0 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="font-medium text-base mr-auto mt-5 mb-5">
                Tasks In Progress
              </h2>
              <a href="" className="ml-auto text-primary truncate">
                Show More
              </a>
            </div>
            <div className="p-5">
              <div>
                <div className="flex">
                  <div className="mr-auto">Pending Tasks</div>
                  <div>20%</div>
                </div>
                <div className="progress h-1 mt-2">
                  <div
                    className="progress-bar w-1/2 bg-primary"
                    role="progressbar"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex">
                  <div className="mr-auto">Completed Tasks</div>
                  <div>2 / 20</div>
                </div>
                <div className="progress h-1 mt-2">
                  <div
                    className="progress-bar w-1/4 bg-primary"
                    role="progressbar"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex">
                  <div className="mr-auto">Tasks In Progress</div>
                  <div>42</div>
                </div>
                <div className="progress h-1 mt-2">
                  <div
                    className="progress-bar w-3/4 bg-primary"
                    role="progressbar"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex">
                  <div className="mr-auto">Tasks In Review</div>
                  <div>70%</div>
                </div>
                <div className="progress h-1 mt-2">
                  <div
                    className="progress-bar w-4/5 bg-primary"
                    role="progressbar"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center">
                <div className="border-l-2 border-primary dark:border-primary pl-4">
                  <a href="" className="font-medium">
                    Create New Campaign
                  </a>
                  <div className="text-slate-500">Due date Friday 24 August</div>
                </div>
                <div className="form-check form-switch ml-auto">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
              <div className="flex items-center mt-5">
                <div className="border-l-2 border-primary dark:border-primary pl-4">
                  <a href="" className="font-medium">
                    Book Meeting With Client
                  </a>
                  <div className="text-slate-500">Due date Sunday 26 August</div>
                </div>
                <div className="form-check form-switch ml-auto">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
              <div className="flex items-center mt-5">
                <div className="border-l-2 border-primary dark:border-primary pl-4">
                  <a href="" className="font-medium">
                    Create New Repository
                  </a>
                  <div className="text-slate-500">Due date Monday 27 August</div>
                </div>
                <div className="form-check form-switch ml-auto">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
              <div className="flex items-center mt-5">
                <div className="border-l-2 border-primary dark:border-primary pl-4">
                  <a href="" className="font-medium">
                    Create Website
                  </a>
                  <div className="text-slate-500">Due date Monday 3 September</div>
                </div>
                <div className="form-check form-switch ml-auto">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
            </div>
          </div>
          {/* END: Tasks In Progress */}
          {/* BEGIN: Meetings */}
          <div className="intro-y box col-span-12 2xl:col-span-6 mt-5">
            <div className="flex items-center px-5 py-5 sm:py-0 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="font-medium text-base mr-auto mt-5 mb-5">Meetings</h2>
              <a href="" className="ml-auto text-primary truncate">
                Show More
              </a>
            </div>
            <div className="p-5">
              <div className="flex items-center">
                <div className="border-l-2 border-primary dark:border-primary pl-4">
                  <a href="" className="font-medium">
                    Meeting With Client
                  </a>
                  <div className="text-slate-500">Monday 27 August | 10:00 AM</div>
                </div>
                <div className="form-check form-switch ml-auto">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
              <div className="flex items-center mt-5">
                <div className="border-l-2 border-primary dark:border-primary pl-4">
                  <a href="" className="font-medium">
                    Zoom With Client
                  </a>
                  <div className="text-slate-500">Monday 30 August | 02:00 PM</div>
                </div>
                <div className="form-check form-switch ml-auto">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
            </div>
          </div>
          {/* END: Meetings */}
          {/* BEGIN: Calls */}
          <div className="intro-y box col-span-12 2xl:col-span-6 mt-5">
            <div className="flex items-center px-5 py-5 sm:py-0 border-b border-slate-200/60 dark:border-darkmode-400 pt-5 pb-5">
              <h2 className="font-medium text-base mr-auto mt-5 mb-5">Calls</h2>
              <a href="" className="ml-auto text-primary truncate">
                Show More
              </a>
            </div>
            <div className="p-5">
              <div className="flex items-center">
                <div className="border-l-2 border-primary dark:border-primary pl-4">
                  <a href="" className="font-medium">
                    Call about...
                  </a>
                  <div className="text-slate-500">Tuesday 22 August | 10:00 AM</div>
                </div>
                <div className="form-check form-switch ml-auto">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
              <div className="flex items-center mt-5">
                <div className="border-l-2 border-primary dark:border-primary pl-4">
                  <a href="" className="font-medium">
                    Call about ...
                  </a>
                  <div className="text-slate-500">Monday 27 August | 02:00 PM</div>
                </div>
                <div className="form-check form-switch ml-auto">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
              <div className="flex items-center mt-5">
                <div className="border-l-2 border-primary dark:border-primary pl-4">
                  <a href="" className="font-medium">
                    Create New Repository
                  </a>
                  <div className="text-slate-500">Tuesday 28 August | 04:00 PM</div>
                </div>
                <div className="form-check form-switch ml-auto">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
              <div className="flex items-center mt-5">
                <div className="border-l-2 border-primary dark:border-primary pl-4">
                  <a href="" className="font-medium">
                    Meeting With Client
                  </a>
                  <div className="text-slate-500">Friday 07 September | 10:00 AM</div>
                </div>
                <div className="form-check form-switch ml-auto">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
              <div className="flex items-center mt-5">
                <div className="border-l-2 border-primary dark:border-primary pl-4">
                  <a href="" className="font-medium">
                    Create New Repository
                  </a>
                  <div className="text-slate-500">Monday 27 September | 11:00 PM</div>
                </div>
                <div className="form-check form-switch ml-auto">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
            </div>
          </div>
          {/* END: Calls */}
        </div>
        {/* END: Profile Menu */}
        <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
          <div className="grid grid-cols-12 gap-6">
            {/* BEGIN: Deals Details */}
            <div className="intro-y box col-span-12 2xl:col-span-6">
              <div className="col-span-12 lg:col-span-7 2xl:col-span-8">
                <div className="box p-5 rounded-md">
                  Deals Details
                </div>
              </div>
            </div>
            {/* END: Deals */}
            {/* BEGIN: Transactions */}
            <div className="intro-y box col-span-12 2xl:col-span-6">
              <div className="col-span-12 lg:col-span-7 2xl:col-span-8">
                <div className="box p-5 rounded-md">
                  <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                    <div className="font-medium text-base truncate">
                      Transactions
                    </div>
                    <button className="btn btn-outline-secondary hidden sm:flex ml-auto">
                      <Lucide icon="Plus" className="w-4 h-4" />Add Deal
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="whitespace-nowrap">INVOICE</th>
                          <th className="whitespace-nowrap">DEAL NAME</th>
                          <th className="text-center whitespace-nowrap">STATUS</th>
                          <th className="whitespace-nowrap">PAYMENT</th>
                          <th className="text-center whitespace-nowrap">AMOUNT</th>
                          <th className="text-center whitespace-nowrap">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {$_.take($f(), 9).map((faker, fakerKey) => (
                          <tr key={fakerKey} className="intro-x">
                            <td className="w-40 !py-4">
                              <a
                                href=""
                                className="underline decoration-dotted whitespace-nowrap"
                              >
                                {"#INV-" + faker.totals[0] + "807556"}
                              </a>
                            </td>
                            <td className="w-40">
                              <a href="" className="font-medium whitespace-nowrap">
                                {faker.products[0].name}
                              </a>
                              {faker.trueFalse[0] ? (
                                <div
                                  v-if="faker.trueFalse[0]"
                                  className="text-slate-500 text-xs whitespace-nowrap mt-0.5"
                                >
                                  {$f()[0].users[0].name}
                                </div>
                              ) : (
                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                  {$f()[0].users[0].name}
                                </div>
                              )}
                            </td>
                            <td className="text-center">
                              <div
                                className={classnames({
                                  "flex items-center justify-center whitespace-nowrap": true,
                                  "text-success": faker.trueFalse[0],
                                  "text-danger": !faker.trueFalse[0],
                                })}
                              >
                                {faker.trueFalse[0] ? (
                                  <div className="flex items-center justify-center">
                                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />Paid
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center">
                                    <Lucide icon="X" className="w-4 h-4 mr-1" />Outstanding
                                  </div>
                                )}
                              </div>
                            </td>
                            <td>
                              {faker.trueFalse[0] ? (
                                <>
                                  <div className="whitespace-nowrap">
                                    Direct bank transfer
                                  </div>
                                  <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                    25 March, 12:55
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="whitespace-nowrap">
                                    Checking payments
                                  </div>
                                  <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                    30 March, 11:00
                                  </div>
                                </>
                              )}
                            </td>
                            <td className="w-40 text-right">
                              <div>${faker.totals[0] + ",000,00"}</div>
                            </td>
                            <td className="table-report__action">
                              <div className="flex justify-center items-center">
                                <a
                                  className="flex items-center text-primary whitespace-nowrap"
                                  href="#"
                                  onClick={() => {
                                    setDeleteConfirmationModal(true);
                                  }}
                                >
                                  <Lucide
                                    icon="ArrowLeftRight"
                                    className="w-4 h-4 mr-1"
                                  />
                                  Change Status
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* END: Transactions */}
            {/* BEGIN: Notes */}
            <div className="intro-y box col-span-12 2xl:col-span-6">
              <div className="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 className="font-medium text-base mr-auto">Notes</h2>
                <button className="tiny-slider-navigator btn btn-outline-secondary px-2">
                  Edit
                </button>
              </div>
              <div className="px-5">
                <div className="font-medium text-lg mt-5">
                  To do List
                </div>
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
