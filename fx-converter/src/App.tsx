import { useState, useRef, useEffect } from "react";
import { NavLink, Outlet } from "react-router";
import { getCurrencies, convert } from "./services/api";
import type { currenciesTypes } from "./services/api";

function App() {
  const [currencies, setCurrencies] = useState<Array<currenciesTypes>>([]);
  const [sentCurrency, setSentCurrency] = useState<string>("USD");
  const [recieveCurrency, setReceiveCurrency] = useState<string>("EUR");
  const receiveInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function displayCurrencies() {
      const data = await getCurrencies();
      setCurrencies(data);
    }
    displayCurrencies();
  }, []);

  async function convertSend(sentInputValue?: string) {
    let conversionValue;
    if (sentInputValue) {
      conversionValue = await convert(
        sentCurrency,
        recieveCurrency,
        parseInt(sentInputValue),
      );
    }

    if (conversionValue && receiveInputRef.current) {
      console.log(conversionValue);
      receiveInputRef.current.value = conversionValue.toString();
    }
  }

  return (
    <>
      <h1>Hello world</h1>

      <div>
        <input
          name="sent"
          type="number"
          placeholder="0"
          onChange={async (e) => await convertSend(e.target.value)}
        />

        <select
          name="sent"
          defaultValue="USD"
          onChange={(e) => {
            setSentCurrency(e.target.value);
            convertSend();
          }}
        >
          {currencies.map((currency: currenciesTypes) => (
            <option key={currency.iso_code} value={currency.iso_code}>
              {currency.iso_code} {currency.name}
            </option>
          ))}
        </select>
      </div>

      <button type="button">swap</button>

      <div>
        <input
          ref={receiveInputRef}
          name="receive"
          type="number"
          placeholder="0"
        />
        <select
          name="receive"
          defaultValue="EUR"
          onChange={(e) => {
            setReceiveCurrency(e.target.value);
            convertSend();
          }}
        >
          {currencies.map((currency: currenciesTypes) => (
            <option key={currency.iso_code} value={currency.iso_code}>
              {currency.iso_code} {currency.name}
            </option>
          ))}
        </select>
      </div>

      <hr />

      <NavLink to="/">History</NavLink>
      <NavLink to="/compare">Compare</NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
      <NavLink to="/log">Log</NavLink>

      <Outlet />
    </>
  );
}

export default App;
