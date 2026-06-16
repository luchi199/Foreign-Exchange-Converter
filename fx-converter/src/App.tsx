import { useState, useEffect, useCallback } from "react";
import { NavLink, Outlet } from "react-router";
import { getCurrencies, convert } from "./services/api";
import type { currenciesTypes } from "./services/api";

function App() {
  //#region
  const [currencies, setCurrencies] = useState<Array<currenciesTypes>>([]);
  const [sentInputValue, setSentInputValue] = useState<string>("");
  const [receiveInputValue, setReceiveInputValue] = useState<string>("");
  const [sentSelectValue, setSentSelectValue] = useState<string>("USD");
  const [receiveSelectValue, setReceiveSelectValue] = useState<string>("EUR");

  useEffect(() => {
    async function fetchCurrencies() {
      const data = await getCurrencies();
      setCurrencies(data);
    }
    fetchCurrencies();
  }, []);

  const convertValues = useCallback(async () => {
    if (!sentInputValue) return;

    const conversionValue = await convert(
      sentSelectValue,
      receiveSelectValue,
      parseInt(sentInputValue),
    );

    if (conversionValue) {
      setReceiveInputValue(conversionValue.toString());
    }
  }, [sentSelectValue, receiveSelectValue, sentInputValue]);

  useEffect(() => {
    convertValues();
  }, [convertValues]);

  function swapValues() {
    const temp = sentSelectValue;

    setSentSelectValue(receiveSelectValue);
    setReceiveSelectValue(temp);
  }
  // #endregion

  return (
    <>
      <h1 className="bg-red-300 text-preset-4">Hello world</h1>

      <div>
        <input
          name="sent"
          type="number"
          placeholder="0"
          value={sentInputValue}
          onChange={(e) => setSentInputValue(e.currentTarget.value)}
        />

        <select
          name="sent"
          value={sentSelectValue}
          onChange={(e) => setSentSelectValue(e.currentTarget.value)}
        >
          {currencies.map((currency: currenciesTypes) => (
            <option key={currency.iso_code} value={currency.iso_code}>
              {currency.iso_code} {currency.name}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={swapValues}>
        swap
      </button>

      <div>
        <input
          name="receive"
          type="number"
          placeholder="0"
          value={receiveInputValue}
          readOnly
        />
        <select
          name="receive"
          value={receiveSelectValue}
          onChange={(e) => setReceiveSelectValue(e.currentTarget.value)}
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
