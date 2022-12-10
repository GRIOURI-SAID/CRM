import { newFetch } from "../../newFetch";

export const createProduct = async (data) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("products/create-product", {
    alphaToken,
    data,
  });
  return result;
};

export const uploadProductPicName = async (newIdProduct, imgsrc) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("products/upload-product-pic-name", {
    newIdProduct,
    imgsrc,
    alphaToken,
  });
  return result;
};

export const getAllProducts = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("products/get-all-products", {
    alphaToken,
  });
  // console.log("result", result);
  return result;
};

export const deleteProduct = async (productId) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("products/delete-product", {
    alphaToken,
    productId,
  });
  console.log(result);
  return result;
};
