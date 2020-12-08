import * as Yup from "yup";

export const createGatewaySchema = Yup.object().shape({
  serial: Yup.string().required("Serial is required"),
  name: Yup.string().required("Name is required"),
  address: Yup.string()
    .trim()
    .matches(
      /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/,
      "Ipv4 address is invalid"
    )
    .required("Ipv4 address is required"),
});
