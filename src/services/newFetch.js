import axios from "axios";

export const newFetch = async (url, params = null) => {
  const { alphaToken } = localStorage;
  if (!alphaToken) {
    localStorage.removeItem("alphaToken");
    localStorage.removeItem("refreshedToken");
    window.location.reload();
    return;
  }

  const verifToken = await axios.post(
    `${import.meta.env.VITE_API_URL}/verify-alphatoken`,
    { alphaToken }
  );
  if (verifToken.data == false) {
    localStorage.removeItem("alphaToken");
    localStorage.removeItem("refreshedToken");
    window.location.reload();
    return;
  }

  let res = await axios.post(`${import.meta.env.VITE_API_URL}/${url}`, params);

  // console.log("tout est cool");
  return res.data;
};
