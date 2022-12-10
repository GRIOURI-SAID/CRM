import { newFetch } from "../../newFetch";

export const createMeeting = async (form) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("meetings/create-meeting", {
    alphaToken,
    form,
  });
  return result;
};

export const updateMeeting = async (form) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("meetings/update-meeting", {
    alphaToken,
    form,
  });
  return result;
};

export const getAllMeetings = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("meetings/get-all-meetings", {
    alphaToken,
  });
  return result;
};

export const updateDropedMeeting = async (id, newDateParsed) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("meetings/update-droped-meeting", {
    alphaToken,
    id,
    newDateParsed,
  });
  return result;
};
