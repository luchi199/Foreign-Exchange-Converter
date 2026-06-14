import { API_BASE_URL } from "../config";

export interface currenciesTypes {
  iso_code: string;
  iso_numeric: string;
  name: string;
  symbol: string;
  start_date: Date;
  end_date: Date;
}

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

export async function convert(
  base: string = "USD",
  quote: string,
  amount: number,
) {
  try {
    const res = await fetch(`${API_BASE_URL}/rate/${base}/${quote}`);
    if (!res.ok) {
      throw new Error(
        `Error encounterd while fetching rate: ${res.statusText}`,
      );
    }

    const data = await res.json();
    console.log(data);
    return amount * data.rate;
  } catch (error) {
    console.error("Failed to convert values:", error);
  }
}
