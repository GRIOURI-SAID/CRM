import { newFetch } from "../../newFetch";

export const getAllAccess = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("access/get-all-access", {
    alphaToken,
  });
  return result;
};
