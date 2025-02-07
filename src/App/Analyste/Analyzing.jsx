import React, { useContext, useEffect } from "react";
import { Active } from "@/App";
import { Header } from "../Header";
import AnalyzingCard from "@/components/ui/AnalyzingCard";

function Analyzing() {
  // Array of sample data for the cards
  const reports = [
    {
      date: "02 Dec, 2024",
      title: "DNSimple",
      category: "no category",
      severity: "no severity",
      description:
        "The operating system level DNS resolver is the second and last local stop before a DNS query leaves your machine. The process inside your operating system that is The operating system level DNS resolver is the  The operating system level DNS resolver is the  second and last local stop before a DNS query leaves your lyna",
    },
    {
      date: "03 Dec, 2024",
      title: "Cloudflare DNS",
      category: "no category",
      severity: "no severity",
      description:
        "Cloudflare’s DNS resolver adds speed and security to your queries by preventing ISPs from monitoring your activity and blocking malware ......",
    },
    {
      date: "04 Dec, 2024",
      title: "Google Public DNS",
      category: "no category",
      severity: "no severity",
      description:
        "Google’s Public DNS service offers high-speed querying and enhanced DNS security to improve browsing experience ......",
    },
    {
      date: "05 Dec, 2024",
      title: "OpenDNS",
      category: "no category",
      severity: "no severity",
      description:
        "OpenDNS adds layers of security to DNS queries and blocks threats before they reach your network ......",
    },
    {
      date: "06 Dec, 2024",
      title: "Quad9 DNS",
      category: "no category",
      severity: "no severity",
      description:
        "Quad9 blocks malicious domains through DNS filtering and improves security with fast performance ......",
    },
    {
      date: "07 Dec, 2024",
      title: "AdGuard DNS",
      category: "no category",
      severity: "no severity",
      description:
        "AdGuard DNS is a fast and secure way to block ads, tracking, and phishing websites ......",
    },
    {
      date: "08 Dec, 2024",
      title: "Comodo Secure DNS",
      category: "no category",
      severity: "no severity",
      description:
        "Comodo Secure DNS ensures secure browsing by identifying harmful websites and blocking phishing attempts ......",
    },
    {
      date: "09 Dec, 2024",
      title: "CleanBrowsing DNS",
      category: "no category",
      severity: "no severity",
      description:
        "CleanBrowsing DNS focuses on parental control and privacy while filtering adult and malicious content ......",
    },
    // Add more cards as needed
  ];

  const { setActiveItem } = useContext(Active);
  useEffect(() => {
    setActiveItem("Analyzing");
  }, []);
  return (
    <div>
      <Header />
      <div>
        <div className="py-0.5 rounded-xl bg-second mx-3"></div>
        <div className="pl-16 py-5 pr-3"></div>
      </div>

      <div>
        <header className="flex items-center bg-white p-4">
          <div className="mr-52">
            <h1 className="text-lg font-semibold">Analyzing</h1>
            <p className="text-sm text-[#04040466]">
              Review the search and retain only the valuable insights.
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-[#F3F4ED] text-black font-semibold w-24 ext-sm py-2 px-4 rounded-lg">
              Add File
            </button>
            <div className="bg-[#F3F4ED] text-black font-semibold w-24 ext-sm py-2 px-4 rounded-lg ">
              Sort by
            </div>
            <button className="bg-[#FF2727] text-white font-semibold ext-sm py-2 px-4 rounded-lg hover:bg-red-600">
              Delete
            </button>
            <button className="bg-[#E5FB54] text-black font-semibold text-sm py-2 px-4 rounded-lg hover:bg-gray-100">
              Submit
            </button>
          </div>
        </header>
        <main className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <AnalyzingCard
                key={index}
                date={report.date}
                title={report.title}
                description={report.description}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export { Analyzing };
