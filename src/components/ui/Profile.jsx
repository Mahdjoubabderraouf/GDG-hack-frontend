import { button } from "@nextui-org/theme";
import React from "react";

function Profile({ name, role, image }) {
  return (
    // <div className="p-1 flex gap-3 justify-start items-center bg-first rounded-xl ">
    <button className="cursor-pointer">
      <img className="h-10 rounded-full w-14" src={image} alt="profile" />
    </button>
  );
}

export { Profile };
