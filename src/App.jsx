import "./App.css";
import LoginPage from "./App/LoginPage";
import { Route, Routes } from "react-router-dom";
import { createContext, useState, useMemo } from "react";
import Layout from "./App/layout";
import Events from "./App/events";
import { HrTrackMembers } from "./App/HrTrackMembers";
import AddEvent from "./App/AddEvent";

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
  const [activeItem, setActiveItem] = useState("Event");
  const value = useMemo(
    () => ({ activeItem, setActiveItem }),
    [activeItem, setActiveItem]
  );

  return (
    <Active.Provider value={value}>
      <Routes>
        <Route exact path="/" element={<MainRoute />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/hrmanager" element={<Layout />}>
          <Route path="event" element={<Events />} />
          <Route path="members" element={<HrTrackMembers />} />
          <Route path="addEvent" element={<AddEvent />} />
        </Route>
      </Routes>
    </Active.Provider>
  );
}

export default App;
