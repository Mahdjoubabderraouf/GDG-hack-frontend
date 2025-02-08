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

import { OpenModule } from "@/components/ui/modal";

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

  const handleAddTask = (newTask) => {
    setFilteredData([...filteredData, newTask]);
  };

  return (
    <main className="w-full p-3">
      <Header />
      <div className="pl-16 py-5 pr-3"></div>
      <div className="flex justify-between px-12">
        <h3 className="pb-7">Track Tasks</h3>
        <OpenModule
          btnName="Add Task"
          Title="Add New Task"
          Content={
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newTask = {
                  taskName: formData.get("taskName"),
                  assignedTo: formData.get("assignedTo"),
                  status: "Pending",
                };
                handleAddTask(newTask);
                e.target.reset();
              }}
            >
              <div className="mb-4">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="taskName"
                >
                  Task Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="taskName"
                  name="taskName"
                  type="text"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="heavyTask"
                >
                  Task Importance (1 - 10)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="heavyTask"
                  name="heavyTask"
                  type="number"
                  min="1"
                  max="10"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="dueDate"
                >
                  Due Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="assignedTo"
                >
                  Assigned To
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="assignedTo"
                  name="assignedTo"
                  type="text"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <Button className="bg-first" type="submit">
                  Add Task
                </Button>
              </div>
            </form>
          }
          deleteAction={() => {}}
        />
      </div>

      <div className="px-12">
        <Table className="rounded-xl overflow-hidden">
          <TableHeader className="bg-first">
            <TableRow>
              <TableHead>
                <span>Task Name</span>
              </TableHead>
              <TableHead>
                <span>Assigned to</span>
              </TableHead>
              <TableHead>
                <span>Task Status</span>
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
