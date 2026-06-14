import { API_BASE_URL } from "../config";

export async function getRates() {
  try {
    const res = await fetch(`${API_BASE_URL}/rates?base=USD`);

    if (!res.ok) {
      throw new Error(
        `Error encounterd while fetching rates: ${res.statusText}`,
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

export async function getCurrencies() {
  try {
    const res = await fetch(`${API_BASE_URL}/currencies`);

    if (!res.ok) {
      throw new Error(
        `Error encounterd while fetching rates: ${res.statusText}`,
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

console.log(await getCurrencies());
