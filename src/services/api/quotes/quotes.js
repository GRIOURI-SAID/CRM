import { newFetch } from "../../newFetch";

export const createQuote = async (finalQuote) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("quotes/create-quote", {
    alphaToken,
    finalQuote,
  });
  return result;
};

export const getAllQuotes = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("quotes/get-all-quotes", {
    alphaToken,
  });
  return result;
};

export const getQuoteById = async (idQuote) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("quotes/get-quote-by-id", {
    alphaToken,
    idQuote,
  });
  return result;
};

export const exportQuotes = async (quotesId) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("quotes/export-quotes", {
    alphaToken,
    quotesId,
  });
  return result;
};
