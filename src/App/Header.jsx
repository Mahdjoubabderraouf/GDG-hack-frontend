import { SidebarTrigger } from "@/components/ui/sidebar";
import React, { useState, useEffect } from "react";
import notification from "@/assets/notification.svg";
import { Button } from "@/components/ui/button";
import profile from "@/assets/profile.svg";
import { Profile } from "@/components/ui/Profile";

function Header() {
  const [user, setUser] = useState("Undefined");
  const [role, setRole] = useState("Undefined");
  const [date, setDate] = useState(new Date().toDateString());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/member_details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token // Add the Authorization header
          }
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

    fetchData();
  }, []);

  return (
    <div className="flex p-2 gap-5 items-center w-full justify-between border-b-2 border-second">
      <div className="flex flex-1 gap-5 items-center justify-between">
        <SidebarTrigger />
        <div className="flex-1">
          <h1 className="text-2xl">Welcome {user}</h1>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button className="p-2 min-w-0 rounded-full bg-second hover:bg-[#e3e3e2] ">
          <img className="h-6 w-6" src={notification} alt="notification" />
        </Button>

        <Profile name={user} image={profile} role={role} />
      </div>
    </div>
  );
}

export { Header };
