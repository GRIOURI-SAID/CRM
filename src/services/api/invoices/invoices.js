import { newFetch } from "../../newFetch";

export const createInvoice = async (finalInvoice) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("invoices/create-invoice", {
    alphaToken,
    finalInvoice,
  });
  return result;
};

export const getAllInvoices = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("invoices/get-all-invoices", {
    alphaToken,
  });
  return result;
};

export const getInvoiceById = async (idInvoice) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("invoices/get-invoice-by-id", {
    alphaToken,
    idInvoice,
  });
  return result;
};

export const exportInvoices = async (invoicesId) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("invoices/export-invoices", {
    alphaToken,
    invoicesId,
  });
  return result;
};

export const loginFunc = async () => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/login/login`,
    { email, password }
  );
  if (res.status === 200 && res.data) {
    localStorage.setItem("alphaToken", res.data.alphaToken);
  }
  return res;
};



export const download = async (finalInvoice) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("invoices/create-pdf", {
    alphaToken,
    finalInvoice,
  });
  return result;
}
