import { newFetch } from "../../newFetch";

export const createCustomer = async (data) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("customers/create-customer", {
    alphaToken,
    data,
  });
  return result;
};

export const updateCustomer = async (data) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("customers/update-customer", {
    alphaToken,
    data,
  });
  return result;
};

export const uploadCustomerPicName = async (newIdCustomer, imgsrc) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("customers/upload-customer-pic-name", {
    alphaToken,
    newIdCustomer,
    imgsrc,
  });
  return result;
};

export const getAllCustomers = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("customers/get-all-customers", {
    alphaToken,
  });
  return result;
};

export const deleteCustomer = async (id) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("customers/delete-customer", {
    alphaToken,
    id,
  });
  return result;
};

export const getCustomer = async (id) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("customers/get-customer", {
    alphaToken,
    id,
  });
  return result;
};

export const exportCustomers = async (customersId) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("customers/export-customers", {
    alphaToken,
    customersId,
  });
  return result;
};
export const deleteCustomers = async (customersId) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("customers/delete-customers", {
    alphaToken,
    customersId,
  });
  return result;
};
