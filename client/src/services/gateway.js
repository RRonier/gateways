import API from "API";

export const getGateways = () => API.get("gateways");

export const addGateway = (payload) => API.post("gateways", payload);

export const updateGateway = (id, payload) =>
  API.patch(`gateways/${id}`, payload);

export const getGatewayById = (id) => API.get(`gateways/${id}`);

export const deleteGateway = (id) => API.delete(`gateways/${id}`);
