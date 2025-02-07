import { SidebarTrigger } from "@/components/ui/sidebar";
import React, { useState,useEffect } from "react";
import notification from "@/assets/notification.svg";
import help from "@/assets/help.svg";
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
            Authorization: token , // Add the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.name)
        setUser(data.name);
        setRole(data.role);
      } catch (error) {
        console.error("Error fetching name:", error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div className="flex p-5 gap-5 items-center w-full justify-between">
      <div className="flex flex-1 gap-5 items-center justify-between">
        <SidebarTrigger />
        <div className="flex-1">
          <h1>Welcome {user}</h1>
          <p>Choose your option to your needs</p>
        </div>
      </div>

      <div className="hidden lg:flex font-semibold">
        <p>{date}</p>
      </div>

      <div className="gap-2 hidden md:flex">
        <Button className="p-2 min-w-0 rounded-full bg-second hover:bg-[#e3e3e2] ">
          <img className="h-6 w-6" src={notification} alt="notification" />
        </Button>
        <Button className="p-2 min-w-0 rounded-full bg-second hover:bg-[#e3e3e2]">
          <img className="h-6 w-6" src={help} alt="help" />
        </Button>
      </div>

      <Profile name={user} image={profile} role={role} />
    </div>
  );
}

export { Header };
