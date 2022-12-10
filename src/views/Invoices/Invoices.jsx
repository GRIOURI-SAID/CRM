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
  Litepicker
} from "@/base-components";
import { createInvoice, getAllInvoices, exportInvoices } from '../../services/api/invoices/invoices'
import { getAllProducts } from '../../services/api/products/products'
import { getAllCustomers } from '../../services/api/customers/customers'
import Notification from "../../base-components/notification/Main";
import { LoadingIcon } from "@/base-components";
import * as XLSX from 'xlsx/xlsx.mjs';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import base64Img from "../../assets/images/report.png"


const ProductRow = ({ allProducts, arrProd, setArrProd }) => {

  const [selectedProduct, setSelectedProduct] = useState("")
  const [product, setProduct] = useState(null)
  const [checkProduct, setCheckProduct] = useState(false)
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    total: 0,
  })


  useEffect(() => {

    if (selectedProduct != "" && selectedProduct != "-") {
      const temp = allProducts.filter(prod => prod.id == selectedProduct)
      setProduct(temp[0])
    }
    if (selectedProduct != "" && selectedProduct != "-" && checkProduct && product) {

      setCurrentProduct({
        ...currentProduct,
        name: product.name,
        description: product.description,
        price: product.amount,
        // total: Number(currentProduct.quantity) * Number(currentProduct.price)
      })
    } else {
      setCurrentProduct({
        ...currentProduct,
        name: "",
        description: "",
        price: "",
        // total: Number(currentProduct.quantity) * Number(currentProduct.price)
      })
    }
  }, [selectedProduct, checkProduct, product])

  const addProduct = () => {
    var total = Number(currentProduct.quantity) * Number(currentProduct.price)
    setCurrentProduct({ ...currentProduct, total: total })
    const temp = [...arrProd]
    temp.push(currentProduct)
    setArrProd(temp)
    setCurrentProduct({
      name: "",
      description: "",
      price: "",
      quantity: "",
      total: 0,
    })
  }

  const settingCurrentQuantity = (value) => {
    setCurrentProduct({ ...currentProduct, quantity: value, total: value * currentProduct.price })
  }

  const settingCurrentPrice = (value) => {
    setCurrentProduct({ ...currentProduct, price: value, total: value * currentProduct.quantity })
  }






  return (<>
    <div className="intro-y col-span-12 sm:col-span-12">
      <div className="flex">
        <input type="checkbox" id="checkProd" className="form-check-input mr-4" onChange={e => setCheckProduct(!checkProduct)} />
        <label htmlFor="checkProd" className="form-label">
          From product list ?
        </label>
      </div>
      {checkProduct && (
        <select className="form-select" onChange={(e) => setSelectedProduct(e.target.value)}>
          <option value="-">Choose a product</option>
          {allProducts && allProducts.map((product, index) => {
            return (
              <option key={index} value={product.id}>{product.name}</option>
            )
          })}
        </select>
      )}
    </div>
    <div className="intro-y col-span-12 sm:col-span-6">
      <label htmlFor="input-wizard-1" className="form-label">
        Product Name
      </label>
      <input
        id="input-wizard-1"
        type="text"
        className="form-control mb-4"
        placeholder="Exemple: Cola"
        value={currentProduct.name}
        onChange={checkProduct ? null : (e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}

      />
    </div>
    <div className="intro-y col-span-12 sm:col-span-6">
      <label htmlFor="input-wizard-1" className="form-label">
        Description
      </label>
      <input
        id="input-wizard-1"
        type="text"
        className="form-control mb-4"
        placeholder="Exemple: Cola light"
        value={currentProduct.description}
        onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
      />
    </div>
    <div className="intro-y col-span-12 sm:col-span-6">
      <label htmlFor="input-wizard-1" className="form-label">
        Price
      </label>
      <input
        id="input-wizard-1"
        type="number"
        className="form-control mb-4"
        placeholder="Exemple: 8"
        value={currentProduct.price}
        onChange={checkProduct ? null : (e) => settingCurrentPrice(e.target.value)}
      />
    </div>
    <div className="intro-y col-span-12 sm:col-span-6">
      <label htmlFor="quantity" className="form-label">
        Quantity
      </label>
      <input
        id="quantity"
        type="number"
        className="form-control mb-4"
        placeholder="Exemple: 8"
        value={currentProduct.quantity}
        onChange={(e) => settingCurrentQuantity(e.target.value)}
      />
    </div>
    <div className="intro-y col-span-12 sm:col-span-6">
      <label htmlFor="total" className="form-label">
        Total
      </label>
      <input
        id="total"
        type="number"
        className="form-control mb-4"
        placeholder="Exemple: 8"
        value={currentProduct.total}

      />

    </div>
    <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
      {/* <button className="btn btn-secondary w-24">Previous</button> */}
      <button className="btn btn-primary w-24 ml-2" onClick={addProduct}>Add This Product</button>
    </div>
  </>
  )
}

function Invoices() {
  const [allInvoices, setAllInvoices] = useState([])
  const [allInvoicesSearch, setAllInvoicesSearch] = useState([])
  const [search, setSearch] = useState("")
  const [allCustomers, setAllCustomers] = useState(null)
  const [allProducts, setAllProducts] = useState(null)
  const [productsInvoice, setProductsInvoice] = useState([])
  const [productCount, setProductCount] = useState(0)
  const [stepInvoice, setStepInvoice] = useState(1)
  const [invoiceDate, setInvoiceDate] = useState("")
  const [paymentDate, setPaymentDate] = useState("")
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [arrProd, setArrProd] = useState([])
  const [total, setTotal] = useState(0)
  const [markSearch, setMarkSearch] = useState([false, false])
  const [notificationMsg, setNotificationMsg] = useState({
    icon: "CheckCircle",
    textType: "text-success",
    message: "Invoice successfully created!!",
  });
  const [invoice, setInvoice] = useState({
    invoice_reference: "",
    currency: "shekel",
    customerId: "",
    bankName: "",
    paymentType: "",
    notice: "",
    discountName: "",
    discount: "",
    taxeRate: "",
  });
  const [checked, setChecked] = useState([])

  const successNotification = useRef();
  const successNotificationToggle = () => {
    // Show notification
    successNotification.current.showToast();
  };

  const mainFetch = async () => {
    const res = await getAllCustomers()
    setAllCustomers(res);
    const res2 = await getAllProducts()
    setAllProducts(res2);
    const res3 = await getAllInvoices()
    setAllInvoices(res3)
    setAllInvoicesSearch(res3)
  }
  useEffect(() => {
    setMarkSearch([false, false])
    if (search.length > 0) {
      var invoicesTemp = [...allInvoices]
      var searchTemp = []
      invoicesTemp.forEach((invoice) => {
        if (invoice.invoice_reference.toLowerCase().includes(search.toLowerCase()) || invoice.payment_to_name.toLowerCase().includes(search.toLowerCase())) {
          searchTemp.push(invoice)
          const temp = [false, false]
          if (invoice.invoice_reference.toLowerCase().includes(search.toLowerCase())) {
            temp[0] = true
          }
          if (invoice.payment_to_name.toLowerCase().includes(search.toLowerCase())) {
            temp[1] = true
          }
          setMarkSearch(temp)

        }
      })
      setAllInvoicesSearch(searchTemp)
    } else {
      setAllInvoicesSearch(allInvoices)
    }

  }, [search])



  const handleCheckOne = (id, status) => {
    if (status === true) {
      setChecked(prevState => [...prevState, id])
    } else {
      var checkTemp = checked.filter(current => current != id)
      setChecked(checkTemp)

    }
  }

  const handleCheckAll = (status) => {
    if (status === true) {
      var checkedTemp = []
      allInvoicesSearch.forEach((invoice) => {
        checkedTemp.push(invoice.id)
      })
      setChecked(checkedTemp)
    } else {
      setChecked([])
    }
  }

  const handleExport = async () => {
    var checkedString = checked.join()
    const res = await exportInvoices(checkedString)

    var wb = XLSX.utils.book_new()
    var ws = XLSX.utils.json_to_sheet(res)

    XLSX.utils.book_append_sheet(wb, ws, "Invoices")

    XLSX.writeFile(wb, "Invoices.xlsx")

  }


  const SaveAsPDFHandler = async () => {

    var checkedString = checked.join()
    const res = await exportInvoices(checkedString)

    const doc = new jsPDF()
    autoTable(doc, {
      head: [['INVOICE', 'BUYER NAME', 'PAYMENT', "TOTAL TRANSACTION"]],

      margin: {
        top: 0
      },

      body: res.map(invoice => {
        return [invoice.invoice_reference, invoice.payment_to_name, "Cash", `$ ${invoice.total_amount_taxes_included}`]
      }),
      didDrawPage: function (data) {
        // Header
        doc.setFontSize(20);
        doc.setTextColor(40);
        if (base64Img) {
          doc.addImage(base64Img, 'png', data.settings.margin.left, 3, 0,);
        }

        doc.text(" Report Invoice", data.settings.margin.left + 12, 15);

      },

    })
    doc.save(`invoice.pdf`);




  };


  const handleForm1 = () => {
    setError(null)
    setLoading(true)
    if (invoice.invoice_reference == "" || invoice.currency == "" || invoiceDate == "") {
      setError("Please fill all fields.")
      setLoading(false)
      return;
    }
    setLoading(false)
    setStepInvoice(2)
  }

  const handleForm2 = () => {
    setError(null)
    if (invoice.customerId == "-" || invoice.customerId == "") {
      setError("Please fill all fields.")
      setLoading(false)
      return;
    }
    setLoading(false)
    setStepInvoice(3)
  }

  const handleForm3 = () => {
    if (arrProd.length > 0) {
      setStepInvoice(4)

    }
  }

  const handleForm4 = () => {
    setError(null)
    if (invoice.bankName == "" || invoice.paymentType == "" || invoice.paymentType == "-" || paymentDate == "") {
      setError("Please fill all fields.")
      return
    }
    setStepInvoice(5)
  }


  useEffect(() => {
    var tot = 0
    arrProd.forEach((arr) => {
      tot = tot + arr.total
    })
    setTotal(tot)
  }, [arrProd])

  useEffect(() => {
    mainFetch()
  }, [refreshFlag])

  const removeLine = (id) => {
    const arrTemp = [...arrProd]
    arrTemp.splice(id, 1)
    setArrProd(arrTemp)
  }

  const handleForm5 = async () => {
    setError(null)
    if (invoice.taxeRate == "") {
      setError("Please fill all fields.")
      return
    }
    var productsNames = "";
    var productsDescription = "";
    var productsQuantity = "";
    var productsAmount = "";


    arrProd.forEach((prod) => {
      productsNames = `${productsNames}${prod.name},;,`
      productsDescription = `${productsDescription}${prod.description},;,`
      productsQuantity = `${productsQuantity}${prod.quantity},;,`
      productsAmount = `${productsAmount}${prod.price},;,`
    })

    const customer = allCustomers.filter(custom => custom.id == invoice.customerId)
    const finalInvoice = {
      currency: invoice.currency,
      invoice_date: invoiceDate,
      invoice_reference: invoice.invoice_reference,
      customer_id: invoice.customerId,
      payment_status: "Waiting payment",
      payment_date: paymentDate,
      payment_to_name: customer[0].name,
      payment_to_mail: customer[0].mail,
      payment_to_address: `${customer[0].billing_address_number},;,${customer[0].billing_address_street},;,${customer[0].billing_address_zip},;,${customer[0].billing_address_city},;,${customer[0].billing_address_country}`,
      payment_to_bank_name: invoice.bankName,
      products_id: productsNames,
      product_description: productsDescription,
      product_quantity: productsQuantity,
      product_amount: productsAmount,
      discount_rate: invoice.discount,
      discount_name: invoice.discountName,
      total_amount: total - invoice.discount,
      taxes_rate: invoice.taxeRate,
      total_amount_taxes_included: (total - invoice.discount) + (((total - invoice.discount) * invoice.taxeRate) / 100),
      notice: invoice.notice,
      payment_type: invoice.paymentType,

    }


    const finalResult = await createInvoice(finalInvoice)

    setShowModal(false)
    successNotificationToggle();
    setRefreshFlag(!refreshFlag);



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
      <h2 className="intro-y text-lg font-medium mt-10">Invoice List</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2">
          <div className="flex w-full sm:w-auto">

            <button className="btn btn-primary shadow-md mr-2" onClick={() => setShowModal(true)}>Add New Invoice</button>

            <div className="w-full xl:w-auto flex items-center mt-3 xl:mt-0">
              {checked.length > 0 ? (<>
                <Dropdown>
                  <DropdownToggle className="dropdown-toggle btn px-2 box mr-2">
                    <span className="w-5 h-5 flex items-center justify-center">
                      <Lucide icon="MoreVertical" className="w-4 h-4" />
                    </span>
                  </DropdownToggle>
                  <DropdownMenu className="w-40">
                    <DropdownContent>
                      {/* <DropdownItem>
                      <Lucide icon="ArrowLeftRight" className="w-4 h-4 mr-2" />Change Status
                    </DropdownItem> */}
                      {/* <DropdownItem>
                      <Lucide icon="Bookmark" className="w-4 h-4 mr-2" /> Bookmark
                    </DropdownItem> */}
                      <div onClick={handleExport}>
                        <DropdownItem>
                          <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to Excel
                        </DropdownItem>


                      </div>
                      <div onClick={SaveAsPDFHandler}>
                        <DropdownItem>
                          <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to PDF
                        </DropdownItem>
                      </div>
                    </DropdownContent>
                  </DropdownMenu>
                </Dropdown>
              </>) : null}
              {/* <select className="form-select box ml-2">
                <option>Status</option>
                <option>Waiting Payment</option>
                <option>Confirmed</option>
                <option>Packing</option>
                <option>Delivered</option>
                <option>Completed</option>
              </select> */}
            </div>
          </div>
          {/* <div className="hidden xl:block mx-auto text-slate-500">
            Showing 1 to 10 of 150 entries
          </div> */}
          <div className="w-48 relative text-slate-500">
            <input
              type="text"
              className="form-control w-48 box pr-10"
              placeholder="Search by invoice..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Lucide
              icon="Search"
              className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
            />
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

            {/* WIZARD */}
            <div className="relative before:hidden before:lg:block before:absolute before:w-[69%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 sm:px-20">
              <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                <div className="w-10 h-10 rounded-full btn btn-primary cursor-default">
                  1
                </div>
                <div className={stepInvoice == 1 ? "lg:w-32 font-medium text-base lg:mt-3 ml-3 lg:mx-auto" : "lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"}>
                  Document type
                </div>
              </div>
              <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <div className={stepInvoice >= 2 ? "w-10 h-10 rounded-full btn btn-primary cursor-default" : "w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400 cursor-default"}>
                  2
                </div>
                <div className={stepInvoice == 2 ? "lg:w-32 font-medium text-base lg:mt-3 ml-3 lg:mx-auto" : "lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"}>
                  Customer information
                </div>
              </div>
              <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <div className={stepInvoice >= 3 ? "w-10 h-10 rounded-full btn btn-primary cursor-default" : "w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400 cursor-default"}>
                  3
                </div>
                <div className={stepInvoice == 3 ? "lg:w-32 font-medium text-base lg:mt-3 ml-3 lg:mx-auto" : "lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"}>
                  Transaction details
                </div>
              </div>
              <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <div className={stepInvoice >= 4 ? "w-10 h-10 rounded-full btn btn-primary cursor-default" : "w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400 cursor-default"}>
                  4
                </div>
                <div className={stepInvoice == 4 ? "lg:w-32 font-medium text-base lg:mt-3 ml-3 lg:mx-auto" : "lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"}>
                  Payment information
                </div>
              </div>
              <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <div className={stepInvoice >= 5 ? "w-10 h-10 rounded-full btn btn-primary cursor-default" : "w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400 cursor-default"} >
                  5
                </div>
                <div className={stepInvoice == 5 ? "lg:w-32 font-medium text-base lg:mt-3 ml-3 lg:mx-auto" : "lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"}>
                  Notice
                </div>
              </div>
            </div>
            {stepInvoice == 1 && (
              <div className="px-5 sm:px-20 mt-10 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
                {error && (
                  <div className="text-danger mt-2">
                    {error}
                  </div>
                )}
                <div className="font-medium text-base">Document type</div>
                <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                  <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="input-wizard-1" className="form-label">
                      Invoice Number
                    </label>
                    <input
                      id="input-wizard-1"
                      type="text"
                      className="form-control"
                      placeholder="example: INV-10001"
                      value={invoice.invoice_reference}
                      onChange={(e) => setInvoice({ ...invoice, invoice_reference: e.target.value })}
                    />
                  </div>
                  <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="input-wizard-2" className="form-label">
                      Invoice Date
                    </label>
                    <Litepicker
                      value={invoiceDate}
                      onChange={setInvoiceDate}
                      options={{
                        autoApply: true,
                        showWeekNumbers: true,
                        dropdowns: {
                          minYear: 2022,
                          maxYear: null,
                          months: true,
                          years: true,
                        },
                      }}
                      className="form-control"
                    />
                  </div>
                  <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="input-wizard-3" className="form-label">
                      Currency
                    </label>
                    <select id="input-wizard-6" className="form-select" onChange={(e) => setInvoice({ ...invoice, currency: e.target.value })}>
                      <option value="shekel" >New Israeli Shekel ₪</option>
                      <option value="euro">Euro €</option>
                      <option value="dollar">Dollar $</option>
                    </select>
                  </div>
                  <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                    {/* <button className="btn btn-secondary w-24">Previous</button> */}
                    <button className="btn btn-primary w-24 ml-2" onClick={handleForm1}>Next</button>
                  </div>
                </div>
              </div>
            )}
            {stepInvoice == 2 && (
              <div className="px-5 sm:px-20 mt-10 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
                {error && (
                  <div className="text-danger mt-2">
                    {error}
                  </div>
                )}
                <div className="font-medium text-base">Customer information</div>
                <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                  <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="input-wizard-3" className="form-label">
                      Customer
                    </label>
                    <select id="input-wizard-6" className="form-select" onChange={(e) => setInvoice({ ...invoice, customerId: e.target.value })}>
                      <option value="" >Choose a customer</option>
                      {allCustomers && allCustomers.map((customer, index) => {
                        return (
                          <option key={index} value={customer.id}>{customer.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                    <button className="btn btn-secondary w-24" onClick={() => setStepInvoice(1)}>Previous</button>
                    <button className="btn btn-primary w-24 ml-2" onClick={handleForm2}>Next</button>
                  </div>
                </div>
              </div>
            )}
            {stepInvoice == 3 && (
              <div className="px-5 sm:px-20 mt-10 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
                {error && (
                  <div className="text-danger mt-2">
                    {error}
                  </div>
                )}
                <div className="font-medium text-base">Transaction details</div>
                {arrProd.length > 0 && (
                  <>
                    <div className="overflow-x-auto">
                      <table className="table" >
                        <thead>
                          <tr>
                            <th className="whitespace-nowrap">#</th>
                            <th className="whitespace-nowrap">Product</th>
                            <th className="whitespace-nowrap">Description</th>
                            <th className="whitespace-nowrap">Price</th>
                            <th className="whitespace-nowrap">Quantity</th>
                            <th className="whitespace-nowrap">Total</th>
                            <th className="whitespace-nowrap">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            arrProd.map((product, index) => {

                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{product.name}</td>
                                  <td>{product.description}</td>
                                  <td>{product.price}</td>
                                  <td>{product.quantity}</td>
                                  <td>{product.total}</td>
                                  <td className="flex text-danger cursor-pointer" onClick={() => removeLine(index)}><Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete</td>
                                </tr>
                              )
                            })}
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total</td>
                            <td>{total}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
                <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                  {allProducts && (
                    <ProductRow allProducts={allProducts} arrProd={arrProd} setArrProd={setArrProd} />
                  )}
                  <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                    <button className="btn btn-secondary w-24" onClick={() => setStepInvoice(2)}>Previous</button>
                    <button className="btn btn-primary w-24 ml-2" onClick={handleForm3}>Next</button>
                  </div>
                </div>
              </div>
            )}
            {stepInvoice == 4 && (
              <div className="px-5 sm:px-20 mt-10 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
                {error && (
                  <div className="text-danger mt-2">
                    {error}
                  </div>
                )}
                <div className="font-medium text-base">Payment information</div>
                <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                  <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="input-wizard-3" className="form-label">
                      Payment type
                    </label>
                    <select id="input-wizard-6" className="form-select" onChange={(e) => setInvoice({ ...invoice, paymentType: e.target.value })}>
                      <option value="-">Choose a payment type</option>
                      <option value="check" >Check</option>
                      <option value="transfert">Bank transfer</option>
                      <option value="card">Bank card</option>
                      <option value="cash">Cash</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="input-wizard-1" className="form-label">
                      Total
                    </label>
                    <div
                      id="input-wizard-1"
                      // type="text"
                      className="form-control"
                      style={{ height: "38px", display: "flex", alignItems: "center", paddingLeft: "0.75rem" }}
                    // placeholder="example: INV-10001"
                    >{total}</div>
                  </div>
                  <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="input-wizard-1" className="form-label">
                      Bank name
                    </label>
                    <input
                      id="input-wizard-1"
                      type="text"
                      className="form-control"
                      placeholder="example: INV-10001"
                      value={invoice.bankName}
                      onChange={(e) => setInvoice({ ...invoice, bankName: e.target.value })}
                    />
                  </div>
                  <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="input-wizard-2" className="form-label">
                      Payment deadline
                    </label>
                    <Litepicker
                      value={paymentDate}
                      onChange={setPaymentDate}
                      options={{
                        autoApply: true,
                        showWeekNumbers: true,
                        dropdowns: {
                          minYear: 2022,
                          maxYear: null,
                          months: true,
                          years: true,
                        },
                      }}
                      className="form-control"
                    />
                  </div>

                  <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                    <button className="btn btn-secondary w-24" onClick={() => setStepInvoice(3)}>Previous</button>
                    <button className="btn btn-primary w-24 ml-2" onClick={handleForm4}>Next</button>
                  </div>
                </div>
              </div>
            )}
            {stepInvoice == 5 && (
              <div className="px-5 sm:px-20 mt-10 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
                {error && (
                  <div className="text-danger mt-2">
                    {error}
                  </div>
                )}
                <div className="font-medium text-base">Notice</div>
                <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                  <div className="intro-y col-span-12 sm:col-span-12">
                    <label htmlFor="input-wizard-1" className="form-label">
                      Notices
                    </label>
                    <textarea
                      id="input-wizard-1"
                      type="text"
                      className="form-control"
                      placeholder="example: For some things..."
                      value={invoice.notice}
                      onChange={(e) => setInvoice({ ...invoice, notice: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="input-wizard-1" className="form-label">
                      Taxes (%)
                    </label>
                    <input
                      id="input-wizard-1"
                      type="text"
                      className="form-control"
                      placeholder="example: For some things..."
                      value={invoice.taxeRate}
                      onChange={(e) => setInvoice({ ...invoice, taxeRate: e.target.value })}
                    />
                  </div>
                  <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="input-wizard-2" className="form-label">
                      Discount Name
                    </label>
                    <input
                      id="input-wizard-2"
                      type="text"
                      className="form-control"
                      placeholder="example: For some things..."
                      value={invoice.discountName}
                      onChange={(e) => setInvoice({ ...invoice, discountName: e.target.value })}
                    />
                  </div>
                  <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="input-wizard-3" className="form-label">
                      Discount
                    </label>
                    <input
                      id="input-wizard-3"
                      type="number"
                      className="form-control"
                      placeholder="example: For some things..."
                      value={invoice.discount}
                      onChange={(e) => setInvoice({ ...invoice, discount: e.target.value })}
                    />
                  </div>
                  <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                    <button className="btn btn-secondary w-24" onClick={() => setStepInvoice(4)}>Previous</button>
                    <button className="btn btn-primary w-24 ml-2" onClick={handleForm5}>Create new invoice</button>
                  </div>
                </div>
              </div>
            )}
            {/* WIZARD */}
            {/* <form onSubmit={handleSubmit}>
            </form> */}
          </ModalBody>
        </Modal>
        {/* BEGIN: Data List */}
        <div className="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
          <table className="table table-report -mt-2" id="print">
            <thead>
              <tr>
                <th className="whitespace-nowrap">
                  <input className="form-check-input" type="checkbox" checked={allInvoicesSearch.length == checked.length ? true : false} onChange={(e) => handleCheckAll(e.target.checked)} />
                </th>
                <th className="whitespace-nowrap">INVOICE</th>
                <th className="whitespace-nowrap">BUYER NAME</th>
                {/* <th className="text-center whitespace-nowrap">STATUS</th> */}
                <th className="whitespace-nowrap">PAYMENT</th>
                <th className="text-right whitespace-nowrap">
                  <div className="pr-16">TOTAL TRANSACTION</div>
                </th>
                <th className="text-center whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {allInvoicesSearch && allInvoicesSearch.map((invoice, index) => (
                <tr key={index} className="intro-x">
                  <td className="w-10">
                    <input className="form-check-input" type="checkbox" checked={checked.filter(current => current == invoice.id).length > 0 ? true : false} onChange={(e) => handleCheckOne(invoice.id, e.target.checked)} />
                  </td>
                  <td className="w-40 !py-4">
                    <a
                      href={`/alpha/invoice-view/${invoice.id}`}
                      className="underline decoration-dotted whitespace-nowrap"
                    >
                      {markSearch[0] == true ? <mark className="p-1 bg-yellow-200">{invoice.invoice_reference}</mark> : invoice.invoice_reference}

                    </a>
                  </td>
                  <td className="w-40">
                    <a href="" className="font-medium whitespace-nowrap">
                      {markSearch[1] == true ? <mark className="p-1 bg-yellow-200">{invoice.payment_to_name}</mark> : invoice.payment_to_name}
                    </a>
                    <div
                      v-if="faker.trueFalse[0]"
                      className="text-slate-500 text-xs whitespace-nowrap mt-0.5"
                    >
                      {invoice.payment_to_mail}
                    </div>
                  </td>
                  {/* <td className="text-center">
                    <div
                      className={classnames({
                        "flex items-center justify-center whitespace-nowrap": true,
                        "text-success": faker.trueFalse[0],
                        "text-danger": !faker.trueFalse[0],
                      })}
                    >
                      <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                      {faker.trueFalse[0] ? "Active" : "Inactive"}
                    </div>
                  </td> */}
                  <td>
                    {/* {faker.trueFalse[0] ? ( */}
                    <>
                      <div className="whitespace-nowrap">
                        cash
                      </div>
                      <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                        25 March, 12:55
                      </div>
                    </>
                    {/* ) : (
                      <>
                        <div className="whitespace-nowrap">
                          Checking payments
                        </div>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                          30 March, 11:00
                        </div> */}
                    {/* </> */}
                    {/* )} */}
                  </td>
                  <td className="w-40 text-right">
                    <div className="pr-16">{invoice.currency == "shekel" ? "₪" : invoice.currency == "euro" ? "€" : "$"}{invoice.total_amount_taxes_included}</div>
                  </td>
                  <td className="table-report__action">
                    <div className="flex justify-center items-center">
                      <a
                        className="flex items-center text-primary whitespace-nowrap mr-5"
                        href="invoice-view/1"
                      >
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "}
                        View Details
                      </a>
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
        {/* END: Data List */}
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
            <button type="button" className="btn btn-danger w-24">
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Delete Confirmation Modal */}
    </>
  );
}

export default Invoices;
