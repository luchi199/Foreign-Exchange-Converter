import { useState } from "react";
import { Outlet } from "react-router";

function App() {
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

      <input
        type="number"
        value={sendValue}
        onChange={(e) => setSendValue(e.target.value)}
      />
      <button type="button" onClick={swapValues}>
        swap
      </button>
      <input
        type="number"
        value={receiveValue}
        onChange={(e) => setReceiveValue(e.target.value)}
      />

      <Outlet />
    </>
  );
}

export default App;
