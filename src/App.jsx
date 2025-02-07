import "./App.css";
import LoginPage from "./App/LoginPage";
import { Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import Layout from "./App/layout";
import Events from "./App/events";

export const Active = createContext();

const MainRoute = () => {
  return (
    <>
      <h1> Route page / </h1>
      <h5> Login is in the route /login </h5>
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
        <Route path="/hrmanager" element={<Layout />}>
          <Route path="" element={<Events />} />
          <Route path="members" element={<div>Second div of hr</div>} />
        </Route>
      </Routes>
    </Active.Provider>
  );
}

export default App;
