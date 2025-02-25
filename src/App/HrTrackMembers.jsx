import React, { useEffect, useState, useContext } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Active } from "@/App";
import Filter from "@/components/ui/Filter";

function HrTrackMembers() {
  const [sortConfig, setSortConfig] = useState(null);
  const [filteredData, setFilteredData] = useState([
    { fullName: "John Doe", ghostedTasks: 2, doneTasks: 5, score: 85 },
    { fullName: "Jane Smith", ghostedTasks: 1, doneTasks: 6, score: 90 },
    { fullName: "Alice Johnson", ghostedTasks: 0, doneTasks: 7, score: 100 },
    { fullName: "John Doe", ghostedTasks: 2, doneTasks: 5, score: 85 },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const { activeItem, setActiveItem } = useContext(Active);

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5050/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Add the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.name);
      console.log(data.name);
      setUser(data.name);
      setRole(data.role);
    } catch (error) {
      console.error("Error fetching name:", error);
    }
  };

  useEffect(() => {
    if (activeItem !== "Track members") {
      setActiveItem("Track members");
      fetchData();
    }
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handlehandelTaskScore = (option) => {
    const filtered = initialData.filter((item) => {
      return item.score >= option;
    });

    setFilteredData(filtered);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <h3 className="pb-5">Track Club Members</h3>
      <Filter
        filters={[{ name: "Tasks", options: [85, 10, 30, 40] }]}
        handleTaskScore={handlehandelTaskScore}
      />
      <Table className="rounded-xl overflow-hidden">
        <TableHeader className="bg-first ">
          <TableRow>
            <TableHead className="font-bold">ID</TableHead>
            <TableHead>
              <Button
                className="hover:bg-inherit"
                onClick={() => handleSort("fullName")}
              >
                Full Name <ArrowUpDown className="w-4 h-4 inline" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                onClick={() => handleSort("ghostedTasks")}
                className="hover:bg-inherit"
              >
                Ghosted Tasks <ArrowUpDown className="w-4 h-4 inline" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                onClick={() => handleSort("doneTasks")}
                className="hover:bg-inherit"
              >
                Done Tasks <ArrowUpDown className="w-4 h-4 inline" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                onClick={() => handleSort("score")}
                className="hover:bg-inherit"
              >
                Score <ArrowUpDown className="w-4 h-4 inline" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, index) => (
            <TableRow className="bg-sidebar" key={index}>
              <TableCell className="text-center">
                {startIndex + index + 1}
              </TableCell>
              <TableCell className="text-center">{row.fullName}</TableCell>
              <TableCell className="text-center">{row.ghostedTasks}</TableCell>
              <TableCell className="text-center">{row.doneTasks}</TableCell>
              <TableCell className="text-center">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="pagination flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-first text-white"
                : "bg-white text-first"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export { HrTrackMembers };
