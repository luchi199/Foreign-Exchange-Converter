import { useState } from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router";
import { useLocation } from "react-router";

function App() {
  const location = useLocation();
  const [sendValue, setSendValue] = useState<string>("");
  const [receiveValue, setReceiveValue] = useState<string>("");

  function swapValues() {
    const prev = sendValue;
    setSendValue(receiveValue);
    setReceiveValue(prev);
  }

  return (
    <>
      <h1>Hello world</h1>

      <div>
        <input
          type="number"
          value={sendValue}
          onChange={(e) => setSendValue(e.target.value)}
        />

        <select name="" id=""></select>
      </div>
      <button type="button" onClick={swapValues}>
        swap
      </button>
      <input
        type="number"
        value={receiveValue}
        onChange={(e) => setReceiveValue(e.target.value)}
      />

      <NavLink to="/">History</NavLink>
      <NavLink to="/compare">Compare</NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
      <NavLink to="/log">Log</NavLink>

      <Outlet />
    </>
  );
}

export default App;
