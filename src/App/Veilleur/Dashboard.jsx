import React from "react";
import { Header } from "../Header";
import Layout from "./layout";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <Layout>
        <Header />
        <div className="py-0.5 rounded-xl bg-second mx-3"></div>
        <div className="pl-16 py-5 pr-3">
          <Outlet />
        </div>
      </Layout>
    </div>
  );
}

export { Dashboard };
