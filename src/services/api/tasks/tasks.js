import { newFetch } from "../../newFetch";

export const createTask = async (form) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("tasks/create-task", {
    alphaToken,
    form,
  });
  return result;
};

export const updateTask = async (form) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("tasks/update-task", {
    alphaToken,
    form,
  });
  return result;
};

export const getAllTasks = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("tasks/get-all-tasks", {
    alphaToken,
  });
  return result;
};

export const updateDropedTask = async (id, newDateParsed) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("tasks/update-droped-task", {
    alphaToken,
    id,
    newDateParsed,
  });
  return result;
};
