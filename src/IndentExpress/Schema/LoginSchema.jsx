import * as yup from "yup";

export const LoginInitialValue = {
  userID: "",
  password: "",
  region: "",
};

export const LoginSchema = yup.object({
  userID: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  region: yup.string().required("RSO Name Is required"),
});

// ADMIN VALIDATION SCHEMA
export const CopyStoreInitialValue = {
  fromStoreCode: "",
  toStoreCode: "",
};

export const CopyStoreSchema = yup.object({
  fromStoreCode: yup.string().required("From Store Code is required"),
  toStoreCode: yup.string().required("To Store Code required"),
});



export const updatePortsalInitialValue = {
  level: "",
  mode: "",
};

export const updatePortsalSchema = yup.object({
  level: yup.string().required("Level is required"),
  mode: yup.string().required("Staus is required"),
});

export const loginCredentialsInitialValue = {
  level: "",
};

export const loginCredentialsSchema = yup.object({
  level: yup.string().required("Level is required"),
});

// UPDTAE AUTO MAIL INITILA VALUES
export const updateAutomail = {
  fromMailId: "",
  mailSubject: "",
  mailBody: "",
};

export const updateAutomailSchema = yup.object({
  fromMailId: yup.string().required("Email is required"),
  mailSubject: yup.string().required("Subject is required"),
  mailBody: yup.string().required("Mail Body is required"),
});
