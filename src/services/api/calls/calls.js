import { newFetch } from "../../newFetch";

export const createCall = async (form) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("calls/create-call", {
    alphaToken,
    form,
  });
  return result;
};

export const updateCall = async (form) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("calls/update-call", {
    alphaToken,
    form,
  });
  return result;
};

export const getAllCalls = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("calls/get-all-calls", {
    alphaToken,
  });
  return result;
};

export const updateDropedCall = async (id, newDateParsed) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("calls/update-droped-call", {
    alphaToken,
    id,
    newDateParsed,
  });
  return result;
};
