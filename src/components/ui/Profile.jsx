import React from "react";

function Profile({ name, role, image }) {
  return (
    <div className="px-4 py-2 flex gap-3 justify-start bg-first rounded-xl ">
      <img className="h-14 rounded-full w-14" src={image} alt="profile" />
      <div className="hidden md:block">
        <h4>{name}</h4>
        <span className="font-semibold ">{role}</span>
      </div>
    </div>
  );
}

export { Profile };
