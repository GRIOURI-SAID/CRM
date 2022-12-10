import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { getInvoiceById, download } from '../../services/api/invoices/invoices'
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  DropdownContent,
} from "@/base-components";

import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { newFetch } from "../../services/newFetch";

import { SignatureComponent, Signature } from '@syncfusion/ej2-react-inputs';

function Main() {

  const [invoice, setInvoice] = useState(null)
  const [prodInvoice, setProdInvoice] = useState(null)
  const { invoiceId } = useParams()

  const mainFetch = async () => {
    const res = await getInvoiceById(invoiceId)
    setInvoice(res)
  }

  const SaveAsPDFHandler = async () => {
    const body = {
      data: invoice,
      products: prodInvoice
    }
    download(body).then((res) => {

      axios.get(`${import.meta.env.VITE_API_URL}/invoices/fetch-pdf/${res}`,)
        .then((response) => {
          const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
          console.log(pdfBlob);
          saveAs(pdfBlob, 'newPdf.pdf');
        })
    })
  };

  useEffect(() => {
    mainFetch()
  }, [])

  useEffect(() => {

    if (invoice) {
      var productId = invoice[0].products_id.split(",;,")
      var description = invoice[0].product_description.split(",;,")
      var quantity = invoice[0].product_quantity.split(",;,")
      var price = invoice[0].product_amount.split(",;,")
      const arrProd = []

      for (let i = 0; i < productId.length - 1; i++) {
        arrProd.push({ productId: productId[i], description: description[i], quantity: quantity[i], price: price[i], subTotal: Number(quantity[i]) * Number(price[i]) })
      }
      setProdInvoice(arrProd);

    }

  }, [invoice])

  return (
    <>
      {invoice && (
        <>
          <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
            <h2 className="text-lg font-medium mr-auto">Invoice {invoice[0].invoice_reference
            }</h2>
            <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
              <button className="btn btn-primary shadow-md mr-2" onClick={SaveAsPDFHandler}>Print</button>
              <Dropdown className="ml-auto sm:ml-0">
                <DropdownToggle className="btn px-2 box">
                  <span className="w-5 h-5 flex items-center justify-center">
                    <Lucide icon="Plus" className="w-4 h-4" />
                  </span>
                </DropdownToggle>
                <DropdownMenu className="w-40">
                  <DropdownContent>
                    <DropdownContent>
                      <Lucide icon="File" className="w-4 h-4 mr-2" /> Export Word
                    </DropdownContent>
                    <div onClick={SaveAsPDFHandler}>
                      <DropdownItem>
                        <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to PDF
                      </DropdownItem>
                    </div>

                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          {/* BEGIN: Invoice */}
          <div className="intro-y box overflow-hidden mt-5" id="print">
            <div className="flex flex-col lg:flex-row pt-10 px-5 sm:px-20 sm:pt-20 lg:pb-20 text-center sm:text-left">
              <div className="font-semibold text-primary text-3xl">INVOICE</div>
              <div className="mt-20 lg:mt-0 lg:ml-auto lg:text-right">
                <div className="text-2xl font-large">בס"ד</div>
                <div className="text-xl text-primary font-medium">Eretz Development</div>
                <div className="mt-1">eretz-development@gmail.com</div>
                <div className="mt-1">4 HaMelakha Street, Netanya, Israel.</div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row border-b px-5 sm:px-20 pt-10 pb-10 sm:pb-20 text-center sm:text-left">
              <div>
                <div className="text-base text-slate-500">Client Details</div>
                <div className="text-lg font-medium text-primary mt-2">
                  {invoice[0].payment_to_name}
                </div>
                <div className="mt-1">{invoice[0].payment_to_mail}</div>
                <div className="mt-1">{invoice[0].payment_to_address.replace(/,;,/g, " ")}</div>
              </div>
              <div className="mt-10 lg:mt-0 lg:ml-auto lg:text-right">
                <div className="text-base text-slate-500">Receipt</div>
                <div className="text-lg text-primary font-medium mt-2">
                  {invoice[0].invoice_reference}
                </div>
                <div className="mt-1">{invoice[0].invoice_date}</div>
              </div>
            </div>
            <div className="px-5 sm:px-16 py-10 sm:py-20">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                        DESCRIPTION
                      </th>
                      <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">
                        QTY
                      </th>
                      <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">
                        PRICE
                      </th>
                      <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">
                        SUBTOTAL
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {prodInvoice && prodInvoice.map((prod, index) => {
                      return (
                        <tr key={index}>
                          <td className="border-b dark:border-darkmode-400">
                            <div className="font-medium whitespace-nowrap">
                              {prod.productId}
                            </div>
                            <div className="text-slate-500 text-sm mt-0.5 whitespace-nowrap">
                              {prod.description}
                            </div>
                          </td>
                          <td className="text-right border-b dark:border-darkmode-400 w-32">
                            {prod.quantity}
                          </td>
                          <td className="text-right border-b dark:border-darkmode-400 w-32">
                            {invoice[0].currency == "shekel" ? "₪" : invoice[0].currency == "euro" ? "€" : "$"}{prod.price}
                          </td>
                          <td className="text-right border-b dark:border-darkmode-400 w-32 font-medium">
                            {invoice[0].currency == "shekel" ? "₪" : invoice[0].currency == "euro" ? "€" : "$"}{prod.subTotal}
                          </td>
                        </tr>
                      )
                    })}

                  </tbody>
                </table>
              </div>
            </div>
            <div className="px-5 sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse sm:flex-row">
              <div className="text-center sm:text-left mt-10 sm:mt-0">
                <div className="text-base text-slate-500">Bank Transfer</div>
                <div className="text-lg text-primary font-medium mt-2">
                  {invoice[0].payment_to_bank_name}
                </div>
                {/* <div className="mt-1">Bank Account : 098347234832</div>
                <div className="mt-1">Code : LFT133243</div> */}
              </div>
              <div className="text-center sm:text-right sm:ml-auto">
                <div className="text-base text-slate-500">Total Amount</div>
                <div className="text-xl text-primary font-medium mt-2">
                  {invoice[0].currency == "shekel" ? "₪" : invoice[0].currency == "euro" ? "€" : "$"}{invoice[0].total_amount_taxes_included
                  }
                </div>
                <div className="mt-1">Taxes included</div>
              </div>
            </div>
          </div>
          {/* END: Invoice */}


        </>
      )}
    </>
  );
}

export default Main;
