import "./App.css";
import LoginPage from "./App/LoginPage";
import { Route, Routes } from "react-router-dom";
import { createContext, useState, useMemo } from "react";
import Layout from "./App/layout";
import Events from "./App/events";
import { HrTrackMembers } from "./App/HrTrackMembers";
import AddEvent from "./App/AddEvent";
import { Comanager } from "./App/Comanager";

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
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/hrmanager" element={<Layout />}>
          <Route path="events" element={<Events />}></Route>
          <Route path="members" element={<HrTrackMembers />} />
          <Route path="addEvent" element={<AddEvent />} />
        </Route>
        <Route path="/comanager" element={<Comanager />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Active.Provider>
  );
}

export default App;
