import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { getCurrencies, convert } from "./services/api";
import type { currenciesTypes } from "./services/api";
import { useEffect } from "react";

function App() {
  const [currencies, setCurrencies] = useState<Array<currenciesTypes>>([]);

  useEffect(() => {
    async function displayCurrencies() {
      const data = await getCurrencies();
      setCurrencies(data);
    }
    displayCurrencies();
  }, []);

  return (
    <>
      <h1>Hello world</h1>

      <div>
        <input name="sent" type="number" placeholder="0" />

        <select name="sent">
          {currencies.map((currency: currenciesTypes) => (
            <option key={currency.iso_code} value={currency.iso_code}>
              {currency.iso_code} {currency.name}
            </option>
          ))}
        </select>
      </div>

      <button type="button">swap</button>

      <div>
        <input name="receive" type="number" placeholder="0" />
        <select name="receive">
          {currencies.map((currency: currenciesTypes) => (
            <option key={currency.iso_code} value={currency.iso_code}>
              {currency.iso_code} {currency.name}
            </option>
          ))}
        </select>
      </div>

      <NavLink to="/">History</NavLink>
      <NavLink to="/compare">Compare</NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
      <NavLink to="/log">Log</NavLink>

      <Outlet />
    </>
  );
}

export default App;
