import { Route, Routes } from "react-router-dom";

import AdventOne from "./Pages/AdventOne";
import AdventThree from "./Pages/AdventThree";
import Layout from "./Components/Layout";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Advent Of code</h1>
      <div className="card">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/adventOne" element={<AdventOne />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route path="/adventThree" element={<AdventThree />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
