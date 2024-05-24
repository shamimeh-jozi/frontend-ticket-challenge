import axios from "axios";

const API_BASE = "/api";

export const fetchMaps = async () => {
  const response = await axios.get(`${API_BASE}/map`);
  return response.data;
};

export const fetchMapDetails = async (mapId: string) => {
  const response = await axios.get(`${API_BASE}/map/${mapId}`);
  return response.data;
};

export const buyTicket = async (mapId: string, x: number, y: number) => {
  const response = await axios.post(`${API_BASE}/map/${mapId}`, { x, y });
  return response.data;
};
