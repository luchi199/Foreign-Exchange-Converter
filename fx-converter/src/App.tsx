import { useState, useEffect, useCallback } from "react";
import { NavLink, Outlet } from "react-router";
import { getCurrencies, convert, getRates } from "./services/api";
import type { currenciesTypes, ratesTypes } from "./services/api";
import logo from "./assets/images/logo.svg";
import exchange from "./assets/images/icon-exchange.svg";

function App() {
  //#region
  const [currencies, setCurrencies] = useState<Array<currenciesTypes>>([]);
  const [rates, setRates] = useState<Array<ratesTypes>>([]);
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

  useEffect(() => {
    async function fetchRates() {
      const data = await getRates(sentSelectValue);
      setRates(data);
    }
    fetchRates();
  }, [sentSelectValue]);

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
    <div className="flex flex-col bg-neutral-900 h-screen font-jetbrains">
      <header>
        <div className="flex justify-between items-center gap-2 p-4 md:p-5 md:px-6">
          <img src={logo} alt="" className="h-5 md:h-6.5" />
          <p className="text-neutral-200 text-preset-6 md:text-preset-4 uppercase text-nowrap">
            {currencies.length} currencies · eod · ecb data
          </p>
        </div>
        <div className="flex w-full h-max">
          <div className="flex items-center gap-2 bg-lime-500 p-2 py-3 w-fit">
            <div className="relative flex size-2">
              <div className="inline-flex absolute bg-neutral-900 opacity-20 rounded-full w-full h-full animate-ping"></div>
              <div className="inline-flex bg-neutral-900 rounded-full size-2"></div>
            </div>
            <p className="text-preset-6 uppercase text-nowrap">live markets</p>
          </div>

          <div className="flex bg-neutral-700 w-full overflow-hidden">
            <ul className="flex items-center h-full animate-infinite-scroll">
              {[...rates].map((rate: ratesTypes) => (
                <li
                  key={`rate-${rate.quote}`}
                  className="flex items-center gap-2.5 p-3 border-neutral-500 border-r text-preset-6"
                >
                  <p className="text-neutral-200">
                    {rate.base}/{rate.quote}
                  </p>
                  <p className="text-neutral-50">{rate.rate}</p>
                  <p>{}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto md:p-6 px-4 py-8 md:py-12 w-full max-w-275">
        <section className="flex flex-col gap-4">
          <h1 className="text-neutral-50 text-preset-2 uppercase">
            Check the rate
          </h1>

          <div className="bg-neutral-700 shadow-[0_12px_40px_rgba(0,0,0,0.40)] rounded-[20px] w-full">
            <div className="flex flex-wrap items-center gap-4 p-4 w-full">
              <section className="flex flex-col flex-1 gap-5 bg-neutral-600 p-4 border border-neutral-500 rounded-2xl w-full h-max basis-xs">
                <h2 className="text-neutral-100 text-preset-4 uppercase">
                  send
                </h2>

                <div className="flex justify-between w-full">
                  <input
                    name="sent"
                    type="number"
                    placeholder="0"
                    value={sentInputValue}
                    onChange={(e) => setSentInputValue(e.currentTarget.value)}
                    className="focus:shadow-[0_0_0_4px_#cef739] rounded-lg outline-none w-30 text-neutral-50 text-preset-tablet-1 placeholder:text-neutral-200 decoration-1 decoration-neutral-200 not-focus:hover:underline underline-offset-3"
                  />
                  <select
                    name="sent"
                    value={sentSelectValue}
                    onChange={(e) => setSentSelectValue(e.currentTarget.value)}
                    className="w-full"
                  >
                    {currencies.map((currency: currenciesTypes) => (
                      <option key={currency.iso_code} value={currency.iso_code}>
                        {currency.iso_code} {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

              <button className="bg-red-300 w-max">
                <img src={exchange} alt="exchange icon" />
              </button>
            </div>
          </div>
        </section>
      </main>

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
    </div>
  );
}

export default App;
