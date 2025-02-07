import "./App.css";
import LoginPage from "./App/LoginPage";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./App/Veilleur/Dashboard";
import { DashboardAnalyste } from "./App/Analyste/DashboardAnalyste";
import { Searching } from "./App/Veilleur/Searching";
import Results from "./App/Veilleur/Results";

import { createContext, useState } from "react";
import { EditFile } from "./App/Analyste/EditFile";
import { Analyzing } from "./App/Analyste/Analyzing";

import { DashboardDecideur } from "./App/Decideur/DashboardDecideur";
import { Evaluation } from "./App/Decideur/Evaluation";

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
        <Route path="/veilleur" element={<Dashboard />}>
          <Route path="searching" element={<Searching />} />
          <Route path="results" element={<Results />} />
        </Route>
        <Route path="/analyste" element={<DashboardAnalyste />}>
          <Route path="analyzing" element={<Analyzing />} />
          <Route path="edit/:idfile" element={<EditFile />} />
        </Route>
        <Route path="/decideur" element={<DashboardDecideur />}>
          <Route path="evaluation" element={<Evaluation />} />
        </Route>
      </Routes>
    </Active.Provider>
  );
}

export default App;
