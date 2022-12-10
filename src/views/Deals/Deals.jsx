import {
  Lucide,
  Tippy,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Modal,
  ModalBody,
} from "@/base-components";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";
import { useState } from "react";

function Deals() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Deal List</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <a href="javascript:;" data-tw-toggle="modal" data-tw-target="#superlarge-slide-over-size-preview" className="btn btn-primary mr-2">
            Add New Deal
          </a>
          {/* BEGIN: Add New Modal */}
          <div id="superlarge-slide-over-size-preview" className="modal modal-slide-over" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-body">
                  {/* BEGIN: Wizard Form */}
                  <div className="flex justify-center mt-5">
                    <button className="intro-y w-15 h-15 rounded-full btn btn-primary">
                      <Lucide icon="UserPlus" className="w-8 h-8" />
                    </button>
                  </div>
                  <div className="px-5 mt-5">
                    <div className="font-medium text-center text-lg">
                      Add New Customer
                    </div>
                    <div className="text-slate-500 text-center mt-2">
                      Please complete the feilds below.
                    </div>
                  </div>
                  <div className="px-5 sm:px-20 mt-10 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
                    <div className="font-medium text-center text-lg">Customer Information</div>
                    <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="input-wizard-1" className="form-label">
                          Deal Owner
                        </label>
                        <select id="input-wizard-1" className="form-select">
                          <option>Name of user</option>
                          <option>Name of user</option>
                          <option>Name of user</option>
                          <option>Name of user</option>
                        </select>
                      </div>
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="input-wizard-2" className="form-label">
                          Deal Name
                        </label>
                        <input
                          id="input-wizard-2"
                          type="text"
                          className="form-control"
                          placeholder="Type here..."
                        />
                      </div>
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="input-wizard-3" className="form-label">
                          Customer Name
                        </label>
                        <select id="input-wizard-3" className="form-select">
                          <option>Name of customer</option>
                          <option>Name of customer</option>
                          <option>Name of customer</option>
                          <option>Name of customer</option>
                        </select>
                      </div>
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="input-wizard-4" className="form-label">
                          Product
                        </label>
                        <select id="input-wizard-3" className="form-select">
                          <option value="1" >Website - Landing page - Advanced</option>
                          <option value="2">Branding</option>
                          <option value="3" >Logo</option>
                          <option value="4">Community Management - Silver Pack</option>
                          <option value="5">SEO - Premium</option>
                          <option value="5">Other</option>
                        </select>
                      </div>
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <div className="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                          <div className="mx-auto cursor-pointer relative mt-5">
                            <button htmlFor="input-wizard-5" type="button" className="btn btn-primary w-full">
                              Upload Photo/Logo
                            </button>
                            <input
                              id="input-wizard-5"
                              type="file"
                              className="w-full h-full top-0 left-0 absolute opacity-0"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="input-wizard-6" className="form-label">
                          Description
                        </label>
                        <textarea
                          id="input-wizard-6"
                          type="text"
                          className="form-control"
                          placeholder="Type here..."
                        />
                      </div>
                    </div>
                    <div className="font-medium text-center mt-10 text-lg">Social Networks</div>
                    <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="input-wizard-7" className="form-label">
                          Instagram
                        </label>
                        <input
                          id="input-wizard-7"
                          type="text"
                          className="form-control"
                          placeholder="@johndoe"
                        />
                      </div>
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="input-wizard-8" className="form-label">
                          Facebook
                        </label>
                        <input
                          id="input-wizard-8"
                          type="text"
                          className="form-control"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="input-wizard-9" className="form-label">
                          LinkedIn
                        </label>
                        <input
                          id="input-wizard-9"
                          type="text"
                          className="form-control"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="input-wizard-10" className="form-label">
                          Other
                        </label>
                        <input
                          id="input-wizard-10"
                          type="text"
                          className="form-control"
                          placeholder="Twitter: @JohnDoe"
                        />
                      </div>
                    </div>
                    <div className="font-medium text-center mt-10 text-lg">Customer Details</div>
                    <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="input-wizard-11" className="form-label">
                          Website
                        </label>
                        <input
                          id="input-wizard-11"
                          type="text"
                          className="form-control"
                          placeholder="website.com"
                        />
                      </div>
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="input-wizard-12" className="form-label">
                          Email
                        </label>
                        <input
                          id="input-wizard-12"
                          type="text"
                          className="form-control"
                          placeholder="example@gmail.com"
                        />
                      </div>
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="input-wizard-13" className="form-label">
                          Phone
                        </label>
                        <input
                          id="input-wizard-13"
                          type="text"
                          className="form-control"
                          placeholder="+972506070809"
                        />
                      </div>
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="input-wizard-14" className="form-label">
                          Country
                        </label>
                        <input
                          id="input-wizard-14"
                          type="text"
                          className="form-control"
                          placeholder="France"
                        />
                      </div>
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="input-wizard-15" className="form-label">
                          City
                        </label>
                        <input
                          id="input-wizard-15"
                          type="text"
                          className="form-control"
                          placeholder="Paris"
                        />
                      </div>
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="input-wizard-16" className="form-label">
                          Zip Code
                        </label>
                        <input
                          id="input-wizard-16"
                          type="text"
                          className="form-control"
                          placeholder="75000"
                        />
                      </div>
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="input-wizard-17" className="form-label">
                          Street Name
                        </label>
                        <input
                          id="input-wizard-17"
                          type="text"
                          className="form-control"
                          placeholder="Bonaparte Street"
                        />
                      </div>
                      <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="input-wizard-18" className="form-label">
                          Street Number
                        </label>
                        <input
                          id="input-wizard-18"
                          type="text"
                          className="form-control"
                          placeholder="12"
                        />
                      </div>
                      <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                        <button className="btn btn-secondary w-24">Cancel</button>
                        <button className="btn btn-primary w-24 ml-2">Save</button>
                      </div>
                    </div>
                  </div>
                  {/* END: Wizard Form */}
                </div>
              </div>
            </div>
          </div>
          {/* END: Wizard Form */}
          <Dropdown>
            <DropdownToggle className="btn px-2 box">
              <span className="w-5 h-5 flex items-center justify-center">
                <Lucide icon="MoreVertical" className="w-4 h-4" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="w-40">
              <DropdownContent>
                <DropdownItem>
                  <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print
                </DropdownItem>
                <DropdownItem>
                  <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                  Excel
                </DropdownItem>
                <DropdownItem>
                  <Lucide icon="Trash2" className="w-4 h-4 mr-2" /> Delete
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
        {/* BEGIN: Data List -*/}
        <div className="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
          <table className="table table-report -mt-2">
            <thead>
              <tr>
                <th className="whitespace-nowrap">
                  <input className="form-check-input" type="checkbox" />
                </th>
                <th className="whitespace-nowrap">DEAL NAME</th>
                <th className="text-center whitespace-nowrap">CUSTOMER</th>
                <th className="text-center whitespace-nowrap">DEAL OWNER</th>
                <th className="text-center whitespace-nowrap">STATUS</th>
                <th className="text-center whitespace-nowrap">TOTAL AMOUNT</th>
                <th className="text-center whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {$_.take($f(), 9).map((faker, fakerKey) => (
                <tr key={fakerKey} className="intro-x">
                  <td className="w-10">
                    <input className="form-check-input" type="checkbox" />
                  </td>
                  <td className="!py-3.5">
                    <div className="flex items-center">
                      <div className="text-slate-500">
                        <a href="./deal-view" className="font-medium whitespace-nowrap">
                          {faker.products[0].name}
                        </a>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                          <a href="mailto:" className="font-medium whitespace-nowrap">
                            Created on {faker.dates[0]}
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <a
                      className="flex items-center justify-center underline decoration-dotted"
                      href="#"
                    >
                      {faker.users[0].name}
                    </a>
                  </td>
                  <td className="text-center capitalize">
                    {faker.customers[0].name}
                  </td>
                  <td className="w-40">
                    <div
                      className={classnames({
                        "flex items-center justify-center": true,
                        "text-success": faker.trueFalse[0],
                        "text-danger": !faker.trueFalse[0],
                      })}
                    >
                      {faker.trueFalse[0] ? (
                        <div className="flex items-center justify-center">
                          <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />Active
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Lucide icon="X" className="w-4 h-4 mr-1" />Inactive
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="text-center">
                    <div>${faker.totals[0] + ",000,00"}</div>
                  </td>
                  <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                      <a className="flex items-center mr-3" href="#">
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "}
                        Edit
                      </a>
                      <a
                        className="flex items-center text-danger"
                        href="#"
                        onClick={() => {
                          setDeleteConfirmationModal(true);
                        }}
                      >
                        <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* END: Data List -*/}
        {/* BEGIN: Pagination -*/}
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
        {/* END: Pagination -*/}
      </div>
      {/* BEGIN: Delete Confirmation Modal -*/}
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
              Do you really want to delete these records? <br />
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
            <button type="button" className="btn btn-danger w-24">
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Delete Confirmation Modal -*/}
    </>
  );
}

export default Deals;

