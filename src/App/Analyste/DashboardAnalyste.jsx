import Layout from "./layout";
import { Outlet } from "react-router-dom";

function DashboardAnalyste() {
  return (
    <div>
      <Layout>
        <div className="py-0.5 rounded-xl bg-second mx-3"></div>
        <Outlet />
      </Layout>
    </div>
  );
}

export { DashboardAnalyste };
