import React, { useState } from "react";
import { Header } from "./Header";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@nextui-org/button";

const initialData = [
  { taskName: "Task 1", assignedTo: "John Doe", status: "Done" },
  { taskName: "Task 2", assignedTo: "Jane Smith", status: "Done" },
  { taskName: "Task 3", assignedTo: "Alice Johnson", status: "Done" },
  { taskName: "Task 4", assignedTo: "John Doe", status: "Done" },
  { taskName: "Task 5", assignedTo: "Jane Smith", status: "Done" },
  { taskName: "Task 6", assignedTo: "Alice Johnson", status: "Done" },
  { taskName: "Task 7", assignedTo: "John Doe", status: "Done" },
  { taskName: "Task 8", assignedTo: "Jane Smith", status: "Done" },
  { taskName: "Task 9", assignedTo: "Alice Johnson", status: "Done" },
  { taskName: "Task 10", assignedTo: "John Doe", status: "Done" },
  { taskName: "Task 11", assignedTo: "Jane Smith", status: "Done" },
  { taskName: "Task 12", assignedTo: "Alice Johnson", status: "Done" },
  { taskName: "Task 13", assignedTo: "John Doe", status: "Done" },
  { taskName: "Task 14", assignedTo: "Jane Smith", status: "Done" },
  { taskName: "Task 15", assignedTo: "Alice Johnson", status: "Done" },
  { taskName: "Task 16", assignedTo: "John Doe", status: "Done" },
  { taskName: "Task 17", assignedTo: "Jane Smith", status: "Done" },
  { taskName: "Task 18", assignedTo: "Alice Johnson", status: "Done" },
  { taskName: "Task 19", assignedTo: "John Doe", status: "Done" },
  { taskName: "Task 20", assignedTo: "Jane Smith", status: "Done" },
  { taskName: "Task 21", assignedTo: "Alice Johnson", status: "Done" },
  { taskName: "Task 22", assignedTo: "John Doe", status: "Done" },
  { taskName: "Task 23", assignedTo: "Jane Smith", status: "Done" },
];

function Comanager() {
  const [sortConfig, setSortConfig] = useState(null);
  const [filteredData, setFilteredData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <main className="w-full p-3">
      <Header />
      <div className="pl-16 py-5 pr-3"></div>
      <h3 className="pb-5">Track Tasks</h3>
      <div className="px-12">
        <Table className="rounded-xl overflow-hidden">
          <TableHeader className="bg-first">
            <TableRow>
              <TableHead>
                <span onClick={() => handleSort("taskName")}>Task Name</span>
              </TableHead>
              <TableHead>
                <span onClick={() => handleSort("assignedTo")}>
                  Assigned to
                </span>
              </TableHead>
              <TableHead>
                <span onClick={() => handleSort("status")}>Task Status</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow className="bg-sidebar" key={index}>
                <TableCell className="text-center">{row.taskName}</TableCell>
                <TableCell className="text-center">{row.assignedTo}</TableCell>
                <TableCell className="text-center">
                  <Button
                    //green button if status is done, red if pending
                    className={`${
                      row.status === "Done" ? "bg-green-400" : "bg-red-500"
                    } ${row.status === "Done" ? "text-white" : "text-black"} `}
                    onClick={() => {
                      row.status = row.status === "Done" ? "Pending" : "Done";
                      setFilteredData([...filteredData]);
                    }}
                  >
                    {row.status}
                  </Button>
                </TableCell>
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
      </div>
    </main>
  );
}

export { Comanager };
