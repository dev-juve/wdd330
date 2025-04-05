const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {

  }
  async getData(category) {
    const url = `${baseURL}products/search/${category}`;
    try {
      const response = await fetch(url);
      const data = await convertToJson(response);
      return data.Result;
    } catch (err) {
      console.error(`Fetch failed for ${url}`, err.message);
      return [];
    }
  }
  async findProductById(id) {
    const url = `${baseURL}product/${id}`;
    const response = await fetch(url);
    const data = await convertToJson(response);
    return data.Result;
  }
}
