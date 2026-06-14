import { useState } from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router";
import { getRates } from "./services/api";

function App() {
  const [sendValue, setSendValue] = useState<object>({
    value: "",
    currency: "",
  });
  const [receiveValue, setReceiveValue] = useState<object>({
    value: "",
    currency: "",
  });

  function swapValues() {
    const prev = sendValue;
    setSendValue(receiveValue);
    setReceiveValue(prev);
  }

  return (
    <>
      <h1>Hello world</h1>

      <div>
        <input name="sent" type="number" />

        <select name="sent">
          <option value="usd">US Dollar</option>
          <option value="eur">Euro</option>
          <option value="gbp">British Pound</option>
        </select>
      </div>
      <button type="button" onClick={swapValues}>
        swap
      </button>
      <div>
        <input name="receive" type="number" />
        <select name="receive">
          <option value="usd">US Dollar</option>
          <option value="eur">Euro</option>
          <option value="gbp">British Pound</option>
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
