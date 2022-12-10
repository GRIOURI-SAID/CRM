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
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";
import { LoadingIcon } from "@/base-components";
import { createProduct, uploadProductPicName, getAllProducts, deleteProduct } from '../../services/api/products/products'
import Notification from "../../base-components/notification/Main";
import axios from 'axios'
import * as XLSX from 'xlsx/xlsx.mjs';

function Products() {
  const [allProducts, setAllProducts] = useState([])
  const [allProductsSearch, setAllProductsSearch] = useState([])
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [createUpdate, setCreateUpdate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorProductName, setErrorProductName] = useState(null);
  const [errorProductReference, setErrorProductReference] = useState(null);
  const [errorProductDescription, setErrorProductDescription] = useState(null);
  const [addNewProductPhoto, setAddNewProductPhoto] = useState(null);
  const [productId, setProductId] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [search, setSearch] = useState("");
  const [addNewProduct, setAddNewProduct] = useState({
    name: "",
    product_reference: "",
    description: "",
    amount: 1,
    photo: "",
    stock: 1,
    status: 1,
    created_at: "",
    created_by: "",
    edited_at: "",
    edited_by: ""
  })
  const [notificationMsg, setNotificationMsg] = useState({
    icon: "CheckCircle",
    textType: "text-success",
    message: "New customer successfully created!!",
  });


  const mainFetch = async () => {
    const res = await getAllProducts()
    setAllProducts(res);
    setAllProductsSearch(res)
  }

  useEffect(() => {

    if (search.length > 0) {
      var productTemp = [...allProducts]
      var searchTemp = []

      productTemp.forEach((prod) => {
        if (prod.name.toLowerCase().includes(search.toLowerCase())) {
          searchTemp.push(prod)
        }
      })
      setAllProductsSearch(searchTemp)

    } else {
      setAllProductsSearch(allProducts)
    }

  }, [search])

  useEffect(() => {
    mainFetch()
  }, [refreshFlag])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createProduct(addNewProduct)

    if (addNewProductPhoto) {

      const newIdProduct = result.insertId;
      const data = new FormData();
      data.append("image", addNewProductPhoto);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/upload-product-pic`,
        data
      );

      const res2 = await uploadProductPicName(newIdProduct, res.data);

    }

    setShowModal(false);
    setNotificationMsg({
      icon: "CheckCircle",
      textType: "text-success",
      message: "New product successfully created!!",
    });
    setAddNewProduct({
      name: "",
      product_reference: "",
      description: "",
      amount: 1,
      photo: "",
      stock: 1,
      status: 1,
      created_at: "",
      created_by: "",
      edited_at: "",
      edited_by: ""
    });
    successNotificationToggle();
    setRefreshFlag(!refreshFlag);
    setLoading(false);
  }

  const successNotification = useRef();
  const successNotificationToggle = () => {
    // Show notification
    successNotification.current.showToast();
  };

  const handleUpdate = () => {

  }

  const openModal = (status, id = null) => {
    setCreateUpdate(status);
    setShowModal(true);
  };

  useEffect(() => {
    if (addNewProduct.stock <= 0) {
      setAddNewProduct({ ...addNewProduct, stock: 1 })
    }
    if (addNewProduct.amount <= 0) {
      setAddNewProduct({ ...addNewProduct, amount: 1 })
    }
  }, [addNewProduct])

  const handleDelete = async (id) => {
    setDeleteConfirmationModal(true);
    setProductId(id)
  }
  const handleDeleteProduct = async () => {
    const res = await deleteProduct(productId)
    setNotificationMsg({
      icon: "CheckCircle",
      textType: "text-success",
      message: "Product successfully deleted!!",
    });
    setDeleteConfirmationModal(false)
    setRefreshFlag(!refreshFlag);
    successNotificationToggle();
  }

  const handleExport = () => {
    var wb = XLSX.utils.book_new()
    var ws = XLSX.utils.json_to_sheet(allProductsSearch)

    XLSX.utils.book_append_sheet(wb, ws, "Products")

    XLSX.writeFile(wb, "Products.xlsx")
  }


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
      <h2 className="intro-y text-lg font-medium mt-10">Product Grid</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <button className="btn btn-primary shadow-md mr-2" onClick={() => openModal(1)}>
            Add New Product
          </button>
          <Dropdown>
            <DropdownToggle className="btn px-2 box mr-2">
              <span className="w-5 h-5 flex items-center justify-center">
                <Lucide icon="MoreVertical" className="w-4 h-4" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="w-40">
              <DropdownContent>
                <div onClick={handleExport}>
                  <DropdownItem>
                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                    Excel
                  </DropdownItem>
                </div>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* <div className="hidden md:block mx-auto text-slate-500">
            Showing 1 to 10 of 150 entries
          </div> */}
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
          </div>
        </div>
        <Modal
          size="modal-xl"
          show={showModal}
          slideOver={true}
          onHidden={() => {
            setShowModal(false);
          }}
        >

          <ModalBody>
            <form onSubmit={createUpdate == 1 ? handleSubmit : handleUpdate}>
              {/* BEGIN: Wizard Form */}
              <div className="flex justify-center mt-5">
                <button className="intro-y w-15 h-15 rounded-full btn btn-primary">
                  <Lucide icon="Tag" className="w-8 h-8" />
                </button>
              </div>
              <div className="px-5 mt-5">
                <div className="font-medium text-center text-lg">
                  Add New Product
                </div>
                <div className="text-slate-500 text-center mt-2">
                  Please complete the feilds below.
                </div>
              </div>
              <div className="px-5 sm:px-20 mt-10 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
                <div className="font-medium text-center text-lg">
                  Product Information
                </div>
                <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                  <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="input-wizard-2" className="form-label">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Product Name"
                      value={addNewProduct.name}
                      onChange={(e) =>
                        setAddNewProduct({
                          ...addNewProduct,
                          name: e.target.value,
                        })
                      }
                    />
                    {errorProductName && (
                      <div className="text-danger mt-2">
                        Product Name is a required field
                      </div>
                    )}
                  </div>
                  <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="input-wizard-2" className="form-label">
                      Product Reference
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Product Name"
                      value={addNewProduct.product_reference}
                      onChange={(e) =>
                        setAddNewProduct({
                          ...addNewProduct,
                          product_reference: e.target.value,
                        })
                      }
                    />
                    {errorProductReference && (
                      <div className="text-danger mt-2">
                        Product Reference is a required field
                      </div>
                    )}
                  </div>
                  <div className="intro-y col-span-12 sm:col-span-12">
                    <label htmlFor="input-wizard-2" className="form-label">
                      Product Description
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Product Description"
                      value={addNewProduct.description}
                      onChange={(e) =>
                        setAddNewProduct({
                          ...addNewProduct,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                    {errorProductDescription && (
                      <div className="text-danger mt-2">
                        Product Description is a required field
                      </div>
                    )}
                  </div>
                  <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="input-wizard-2" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Product Name"
                      value={addNewProduct.amount}
                      onChange={(e) =>
                        setAddNewProduct({
                          ...addNewProduct,
                          amount: e.target.value,
                        })
                      }
                    />
                    {errorProductName && (
                      <div className="text-danger mt-2">
                        Product Name is a required field
                      </div>
                    )}
                  </div>
                  <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="input-wizard-2" className="form-label">
                      Stock
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Product Name"
                      value={addNewProduct.stock}
                      onChange={(e) =>
                        setAddNewProduct({
                          ...addNewProduct,
                          stock: e.target.value,
                        })
                      }
                    />
                    {errorProductName && (
                      <div className="text-danger mt-2">
                        Product Name is a required field
                      </div>
                    )}
                  </div>
                  <div className="intro-y col-span-12 sm:col-span-6">
                    <div className="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                      <div className="mx-auto cursor-pointer relative mt-5">
                        <button
                          htmlFor="input-wizard-5"
                          type="button"
                          className="btn btn-primary w-full"
                        >
                          Upload Photo/Logo
                        </button>
                        <input
                          id="input-wizard-5"
                          type="file"
                          className="w-full h-full top-0 left-0 absolute opacity-0"
                          // value={addNewCustomer.photo}
                          onChange={(e) =>
                            setAddNewProductPhoto(e.target.files[0])
                          }
                        />
                      </div>
                    </div>
                  </div>


                  <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                    {loading ? (
                      <LoadingIcon icon="puff" className="w-8 h-8" />
                    ) : (
                      <>
                        <button className="btn btn-secondary w-24">
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary w-24 ml-2"
                        >
                          Save
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* END: Wizard Form */}
            </form>
          </ModalBody>
        </Modal>
        {/* BEGIN: Users Layout */}
        {allProductsSearch && allProductsSearch.map((product, index) => (
          <div
            key={index}
            className="intro-y col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
          >
            <div className="box">
              <div className="p-5">
                <div className="h-40 2xl:h-56 image-fit rounded-md overflow-hidden before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10">
                  <img
                    alt="Midone - HTML Admin Template"
                    className="rounded-md"
                    src={product.photo}
                  />
                  {/* {faker.trueFalse[0] && (
                    <span className="absolute top-0 bg-pending/80 text-white text-xs m-5 px-2 py-1 rounded z-10">
                      Featured
                    </span>
                  )} */}
                  <div className="absolute bottom-0 text-white px-5 pb-6 z-10">
                    <a href="" className="block font-medium text-base">
                      {product.name}
                    </a>
                    <span className="text-white/90 text-xs mt-3">
                      {product.product_reference}
                    </span>
                  </div>
                </div>
                <div className="text-slate-600 dark:text-slate-500 mt-5">
                  <div className="flex items-center">
                    <Lucide icon="Link" className="w-4 h-4 mr-2" /> Price: $
                    {product.amount}
                  </div>
                  <div className="flex items-center mt-2">
                    <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Remaining
                    Stock:
                    {product.stock}
                  </div>
                  <div className="flex items-center mt-2">
                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />{" "}
                    Status:
                    {product.status == 1 ? "Active" : "Inactive"}
                  </div>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end items-center p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                {/* <a className="flex items-center text-primary mr-auto" href="#">
                  <Lucide icon="Eye" className="w-4 h-4 mr-1" /> Preview
                </a> */}
                <a className="flex items-center mr-3" href="#" onClick={() => openModal(0)}>
                  <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" /> Edit
                </a>
                <a
                  className="flex items-center text-danger"
                  href="#"
                  onClick={() => {
                    handleDelete(product.id)
                  }}
                >
                  <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                </a>
              </div>
            </div>
          </div>
        ))}
        {/* END: Users Layout */}
        {/* BEGIN: Pagination */}
        {/* <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
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
        </div> */}
        {/* END: Pagination */}
      </div>
      {/* BEGIN: Delete Confirmation Modal */}
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
            <button type="button" className="btn btn-danger w-24" onClick={handleDeleteProduct}>
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Delete Confirmation Modal */}
    </>
  );
}

export default Products;
