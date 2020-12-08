import * as Yup from "yup";

export const createDeviceSchema = Yup.object().shape({
  uid: Yup.number().typeError("Uid only numbers").required("Uid is required"),
  vendor: Yup.string().required("Vendor is required"),
  status: Yup.string().required("Status is required"),
});
