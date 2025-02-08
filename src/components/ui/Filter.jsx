import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Filter({ filters, handleTaskScore }) {
  return (
    <div className="flex items-center space-x-2 pb-5">
      <h4> Filter: </h4>
      <div className="flex items-center space-x-2">
        {filters.map((filter, index) => (
          <DropdownMenu key={index}>
            <DropdownMenuTrigger className="bg-first rounded-sm px-2">
              {filter.name}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {filter.options.map((option, index) => (
                <DropdownMenuItem
                  onClick={() => handleTaskScore(option)}
                  className="flex justify-center"
                  key={index}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
    </div>
  );
}

export default Filter;
