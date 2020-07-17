import axios from "axios";

const API_URL = "http://localhost:3001/packages/";

async function createPackage(item) {
  const { data: newPackage } = await axios.post(API_URL, {
    item,
  });
  return newPackage;
}

async function deletePackage(id) {
  const message = await axios.delete(`${API_URL}${id}`);
  return message;
}

async function updatePackage(id, payload) {
  const { data: newPackage } = await axios.put(`${API_URL}${id}`, payload);
  return newPackage;
}

async function getAllPackages() {
  const { data: packages } = await axios.get(API_URL);
  return packages;
}

export default { createPackage, deletePackage, updatePackage, getAllPackages };
