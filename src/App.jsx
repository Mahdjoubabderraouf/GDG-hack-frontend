import "./App.css";
import LoginPage from "./App/LoginPage";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./App/Dashboard";

import { createContext, useState } from "react";

export const Active = createContext();

const MainRoute = () => {
  return (
    <>
      <h1> Route page / </h1>
      <h5> Login is in the route /login </h5>
      <h5>
        {" "}
        Veilleur is in the route /veilleur/searching or /veilleur/results{" "}
      </h5>
      <h5>
        {" "}
        Analyste is in the route /analyste/analyzing or /analyste/edit/:idfile{" "}
      </h5>
    </>
  );
};

function App() {
  const [activeItem, setActiveItem] = useState("Searching");
  return (
    <Active.Provider value={{ activeItem, setActiveItem }}>
      <Routes>
        <Route exact path="/" element={<MainRoute />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Active.Provider>
  );
}

export default App;
