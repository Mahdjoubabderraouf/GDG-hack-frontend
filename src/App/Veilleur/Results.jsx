import ResultCard from "@/components/ui/ResultCard";
import { Active } from "@/App";
import { useContext, useEffect, useState } from "react";

export default function Results() {
  const [reports, setReports] = useState([]);
  const { activeItem, setActiveItem } = useContext(Active);

  const fetchResults = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/wm_results", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      console.log(data);
      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (activeItem != "Results") setActiveItem("Results");
    fetchResults();
  }, []);
  // Array of sample data for the cards

  return (
    <div>
      <header className="flex items-center bg-white p-4">
        <div className="mr-96">
          <h1 className="text-lg font-semibold">Results</h1>
          <p className="text-sm text-[#04040466]">
            Filter your reports and submit them to the analyst.
          </p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-[#FF2727] text-white font-semibold w-32 ext-sm py-2 px-6 rounded-lg hover:bg-red-600">
            Delete All
          </button>
          <button className="bg-[#E5FB54] text-black font-semibold text-sm py-2 px-6 rounded-lg hover:bg-gray-100">
            Submit
          </button>
        </div>
      </header>
      <main className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <ResultCard
              key={index}
              date={report.date}
              title={report.title}
              description={report.description}
              content = {report.content}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
