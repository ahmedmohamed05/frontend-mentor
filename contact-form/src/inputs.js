export const nameInputs = [
  {
    label: "First Name",
    isRequired: true,
    type: "text",
    halfWidth: true,
    id: crypto.randomUUID(),
    errMsg: "This field is required",
    showError: false,
  },
  {
    label: "Last Name",
    isRequired: true,
    type: "text",
    halfWidth: true,
    id: crypto.randomUUID(),
    errMsg: "This field is required",
    showError: false,
  },
];

export const emailInput = {
  label: "Email Address",
  isRequired: true,
  type: "email",
  halfWidth: false,
  id: crypto.randomUUID(),
  errMsg: "",
  rg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  showError: false,
};

export const radioInputs = [
  {
    label: "General Enquiry",
    id: crypto.randomUUID(),
    name: "query-type",
    value: "General Enquiry",
    halfWidth: true,
  },
  {
    label: "Support Reqest",
    id: crypto.randomUUID(),
    name: "query-type",
    value: "Support Reqest",
    halfWidth: true,
  },
];

export const msg = {
  id: "msg",
  text: "Message",
  name: "msg",
  errMsg: "This field is required",
  showError: false,
};

export const teamCheckBox = {
  id: "team",
  name: "team",
  text: "I consent to being contacted by the team",
  errMsg: "To submit this form, please consent to being contacted",
  showError: false,
};
