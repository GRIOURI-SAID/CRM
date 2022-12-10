import { newFetch } from "../../newFetch";

export const getRouterPermissions = async () => {
  const { alphaToken } = localStorage;
  console.log("====================================");
  console.log("yuyu");
  console.log("====================================");

  const result = await newFetch("permissions/get-router-permissions", {
    alphaToken,
  });
  console.log("====================================");
  console.log("result");
  console.log("====================================");
  return result;
};
