import axios from "axios";

export const verifMail = async (email) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/login/verif-mail`,
    { email }
  );
  // console.log(res);
  return res;
};

export const loginFunc = async (email, password) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/login/login`,
    { email, password }
  );
  if (res.status === 200 && res.data) {
    localStorage.setItem("alphaToken", res.data.alphaToken);
  }
  return res;
};
