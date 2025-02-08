import { FileText, LogOut, Search } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import logo from "@/assets/logo.png";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Active } from "@/App";

export default function AppSidebar() {
  const { activeItem, setActiveItem } = useContext(Active);
  const navigate = useNavigate();

  const handleClick = (title) => {
    navigate(title.toLowerCase());
  };
  const HandleLogOut = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5050/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("failed to logout");
      }
      const data = await response.json();
      console.log(data);
      // Supprimer le jeton de localStorage
      localStorage.removeItem("token");
      // Navigate to the dashboard or another page
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };
  const navigation = [
    {
      role: "HR Manager",
      Links: [
        {
          title: "Events",
          icon: Search,
          url: "events",
        },
        {
          title: "Track members",
          icon: FileText,
          url: "members",
        },
      ],
    },
    {
      role: "co-manager",
      Links: [
        {
          title: "Track membrs",
          icon: Search,
          url: "#",
        },
      ],
    },
  ];
  return (
    <Sidebar className="text-black font-bold">
      <SidebarHeader className="pb-4 pt-5">
        <div className="flex items-center gap-2 px-2 ">
          <img src={logo} alt="logo" className="h-9 w-9" />
          <span className="text-xl font-bold">GDGHR</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-sm font-bold text-black">
            General
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation[0].Links.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => handleClick(item.url)} // Set active item on click
                    className={`gap-3 rounded-lg px-2 hover:bg-gray-100 font-bold text-black ${
                      activeItem === item.title ? "bg-first hover:bg-first" : ""
                    }`}
                  >
                    <button>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="absolute bottom-10">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  onClick={HandleLogOut}
                  className="gap-3 rounded-lg px-2 hover:bg-gray-100 font-bold text-black"
                >
                  <button>
                    <LogOut className="h-5 w-5" />
                    <span>Log Out</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
