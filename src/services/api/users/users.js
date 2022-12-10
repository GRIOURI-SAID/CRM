import { newFetch } from "../../newFetch";

export const getInfosUser = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("users/get-infos", {
    alphaToken: alphaToken,
  });
  return result;
};

export const getUserById = async (userId) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("users/get-user-by-id", {
    alphaToken: alphaToken,
    userId,
  });
  return result;
};

export const updateMainInfosUser = async (mainInfos) => {
  const result = await newFetch("users/update-main-infos", {
    mainInfos,
  });
  // console.log("result", result);
  return result;
};

export const getProfilPic = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("users/get-profil-pic", {
    alphaToken,
  });
  return result;
};

// USER SELECT

export const getUserSelect = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("users/get-users-select", {
    alphaToken,
  });
  // console.log(result);
  return result;
};

export const getUsers = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("users/get-users", { alphaToken });
  // console.log(result);
  return result;
};

export const createUser = async (newUser) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("users/create-user", {
    alphaToken,
    newUser,
  });
  return result;
};

export const deleteUser = async (id) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("users/delete-user", {
    alphaToken,
    id,
  });
  return result;
};

export const getUser = async (id) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("users/get-user", {
    alphaToken,
    id,
  });
  return result;
};

export const updateUser = async (data) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("users/update-user", {
    alphaToken,
    data,
  });
  return result;
};

export const uploadUserPicName = async (imgsrc) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("users/upload-pic-name", {
    alphaToken,
    imgsrc,
  });
  return result;
};

export const changeEmail = async (email) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("users/change-email", {
    alphaToken,
    email,
  });
  return result;
};

export const changePassword = async (currentPassword, newPassword) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("users/change-password", {
    alphaToken,
    currentPassword,
    newPassword,
  });
  return result;
};
