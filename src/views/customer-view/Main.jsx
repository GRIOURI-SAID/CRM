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
        <h2 className="text-lg font-medium mr-auto">Customer View</h2>
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
                  src={$f()[0].photos[0]}
                />
              </div>
              <div className="ml-4 mr-auto">
                <div className="font-medium text-base">
                  {$f()[0].users[0].name}
                </div>
                <div className="text-slate-500">{$f()[0].users[0].industry}</div>
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
            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
              <a className="flex items-center" href="">
                <Lucide icon="Mail" className="w-4 h-4 mr-2" />{$f()[0].users[0].email}
              </a>
              <a className="flex items-center mt-5" href="">
                <Lucide icon="Globe" className="w-4 h-4 mr-2" /> {$f()[0].users[0].name}.com
              </a>
              <a className="flex items-center mt-5" href="">
                <Lucide icon="Instagram" className="w-4 h-4 mr-2" /> @{$f()[0].users[0].name}
              </a>
              <a className="flex items-center mt-5" href="">
                <Lucide icon="Facebook" className="w-4 h-4 mr-2" /> {$f()[0].users[0].name}
              </a>
              <a className="flex items-center mt-5" href="">
                <Lucide icon="Linkedin" className="w-4 h-4 mr-2" /> {$f()[0].users[0].name}
              </a>
              <a className="flex items-center mt-5" href="">
                <Lucide icon="Twitter" className="w-4 h-4 mr-2" /> @{$f()[0].users[0].name}
              </a>
              <a className="flex items-center mt-5" href="">
                <Lucide
                  icon="MapPin"
                  className="w-4 h-4 mr-2"
                />
                13 Bogroshov Rd, TLV
              </a>
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
                  <div className="text-slate-500">10:00 AM</div>
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
                  <div className="text-slate-500">02:00 PM</div>
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
                  <div className="text-slate-500">04:00 PM</div>
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
                  <div className="text-slate-500">10:00 AM</div>
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
                  <div className="text-slate-500">11:00 PM</div>
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
                    Create New Campaign
                  </a>
                  <div className="text-slate-500">10:00 AM</div>
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
                  <div className="text-slate-500">02:00 PM</div>
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
                  <div className="text-slate-500">04:00 PM</div>
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
                  <div className="text-slate-500">10:00 AM</div>
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
                  <div className="text-slate-500">11:00 PM</div>
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
                    Create New Campaign
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
                    Meeting With Client
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
            {/* BEGIN: Contacts */}
            <div className="intro-y box col-span-12 2xl:col-span-6">
              <div className="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 className="font-medium text-base mr-auto">Contacts</h2>
                <Dropdown className="ml-auto sm:hidden">
                  <DropdownToggle tag="a" className="w-5 h-5 block" href="#">
                    <Lucide
                      icon="MoreHorizontal"
                      className="w-5 h-5 text-slate-500"
                    />
                  </DropdownToggle>
                </Dropdown>
                <button className="btn btn-outline-secondary hidden sm:flex">
                  <Lucide icon="Plus" className="w-4 h-4" />Add Contact
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
                      {
                        ["Sylvie", "Phillipe", "David"][
                        $_.random(0, 2)
                        ]
                      }
                    </a>
                    <div className="text-slate-500 mr-5 sm:mr-5">
                      {$f()[0].jobs[0].name}
                    </div>
                    <h2 className="ml-auto text-primary truncate">Main</h2>
                  </div>
                  <div className="font-medium text-slate-600 dark:text-slate-500">
                    <button className="btn btn-secondary ml-auto">
                      View Profil
                    </button>
                    <button class="btn btn-primary w-12 ml-2">
                      Call
                    </button>
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
                      {
                        ["Rudy Cohen", "Phillipe Partouche", "David Levy"][
                        $_.random(0, 2)
                        ]
                      }
                    </a>
                    <div className="text-slate-500 mr-5 sm:mr-5">
                      {$f()[1].jobs[0].name}
                    </div>
                  </div>
                  <div className="font-medium text-slate-600 dark:text-slate-500">
                    <button className="btn btn-secondary ml-auto">
                      View Profil
                    </button>
                    <button class="btn btn-primary w-12 ml-2">Call</button>
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
                      {
                        ["Sylvie Cohen", "Phillipe Partouche", "David Levy"][
                        $_.random(0, 2)
                        ]
                      }                    </a>
                    <div className="text-slate-500 mr-5 sm:mr-5">
                      {$f()[2].jobs[0].name}
                    </div>
                  </div>
                  <button className="btn btn-secondary ml-auto">
                    View Profil
                  </button>
                  <button class="btn btn-primary w-12 ml-2">Call</button>
                </div>
              </div>
            </div>
            {/* END: Contacts */}
            {/* BEGIN: Deals */}
            <div className="intro-y box col-span-12 2xl:col-span-6">
              <div className="col-span-12 lg:col-span-7 2xl:col-span-8">
                <div className="box p-5 rounded-md">
                  <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                    <div className="font-medium text-base truncate">
                      Deals
                    </div>
                    <button className="btn btn-outline-secondary hidden sm:flex ml-auto">
                      <Lucide icon="Plus" className="w-4 h-4" />Add Deal
                    </button>
                  </div>
                  <div className="overflow-auto lg:overflow-visible -mt-3">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th className="whitespace-nowrap !py-5">Deal Name</th>
                          <th className="whitespace-nowrap text-right">Deal Owner</th>
                          <th className="whitespace-nowrap text-right">Closing Date</th>
                          <th className="whitespace-nowrap text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {$_.take($f(), 8).map((faker, fakerKey) => (
                          <tr key={fakerKey}>
                            <td className="!py-4">
                              <div className="flex items-center">
                                <a
                                  href=""
                                  className="font-medium whitespace-nowrap ml-4"
                                >
                                  {faker.products[0].name}
                                </a>
                              </div>
                            </td>
                            <td className="text-right">
                              {
                                ["Commercial 1", "Commercial 2", "Commercial 3"][
                                $_.random(0, 2)
                                ]
                              }
                            </td>
                            <td className="text-right">
                              {faker.dates[0]}
                            </td>
                            <td className="text-right">
                              ${faker.totals[0] * 2 + ",000.00"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
                                  {faker.users[0].name}
                                </div>
                              ) : (
                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                  {faker.users[0].name}
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
            {/* BEGIN: General Statistics */}
            <div className="intro-y box col-span-12 2xl:col-span-6">
              <div className="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 className="font-medium text-base mr-auto">
                  General Statistics
                </h2>
                <Dropdown className="ml-auto">
                  <DropdownToggle
                    tag="a"
                    className="w-5 h-5 block sm:hidden"
                    href="#"
                  >
                    <Lucide
                      icon="MoreHorizontal"
                      className="w-5 h-5 text-slate-500"
                    />
                  </DropdownToggle>
                  <DropdownToggle className="btn btn-outline-secondary font-normal hidden sm:flex">
                    Export{" "}
                    <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
                  </DropdownToggle>
                  <DropdownMenu className="w-40">
                    <DropdownContent>
                      <DropdownHeader>Export Tools</DropdownHeader>
                      <DropdownDivider />
                      <DropdownItem>
                        <Lucide icon="Printer" className="w-4 h-4 mr-2" />
                        Print
                      </DropdownItem>
                      <DropdownItem>
                        <Lucide icon="ExternalLink" className="w-4 h-4 mr-2" />
                        Excel
                      </DropdownItem>
                      <DropdownItem>
                        <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                        CSV
                      </DropdownItem>
                      <DropdownItem>
                        <Lucide icon="Archive" className="w-4 h-4 mr-2" />
                        PDF
                      </DropdownItem>
                    </DropdownContent>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="p-5">
                <div className="flex flex-col sm:flex-row items-center">
                  <div className="flex flex-wrap sm:flex-nowrap mr-auto">
                    <div className="flex items-center mr-5 mb-1 sm:mb-0">
                      <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                      <span>Author Sales</span>
                    </div>
                    <div className="flex items-center mr-5 mb-1 sm:mb-0">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span>Product Profit</span>
                    </div>
                  </div>
                  <Dropdown className="mt-3 sm:mt-0 mr-auto sm:mr-0">
                    <DropdownToggle className="btn btn-outline-secondary font-normal">
                      Filter by Month
                      <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
                    </DropdownToggle>
                    <DropdownMenu className="w-40">
                      <DropdownContent className="overflow-y-auto h-32">
                        <DropdownItem>January</DropdownItem>
                        <DropdownItem>February</DropdownItem>
                        <DropdownItem>March</DropdownItem>
                        <DropdownItem>June</DropdownItem>
                        <DropdownItem>July</DropdownItem>
                      </DropdownContent>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="report-chart mt-8">
                  {/* <ReportLineChart height={212} /> */}
                </div>
              </div>
            </div>
            {/* END: General Statistics */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
