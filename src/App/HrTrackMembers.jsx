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

const initialData = [
  { fullName: "John Doe", ghostedTasks: 2, doneTasks: 10, score: 85 },
  { fullName: "Jane Smith", ghostedTasks: 1, doneTasks: 15, score: 92 },
  {
    fullName: "Alice Johnson",
    ghostedTasks: 3,
    doneTasks: 8,
    score: 78,
  },
];

function HrTrackMembers() {
  const [sortConfig, setSortConfig] = useState(null);
  const [filteredData, setFilteredData] = useState(initialData);
  const { activeItem, setActiveItem } = useContext(Active);

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  useEffect(() => {
    if (setActiveItem) {
      setActiveItem("Track members");
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
          {sortedData.map((row, index) => (
            <TableRow className="bg-sidebar" key={row.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">{row.fullName}</TableCell>
              <TableCell className="text-center">{row.ghostedTasks}</TableCell>
              <TableCell className="text-center">{row.doneTasks}</TableCell>
              <TableCell className="text-center">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export { HrTrackMembers };
