import { FileText, Headphones, LogOut, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader
} from "@/components/ui/sidebar";
import TrackDns from "@/assets/TrackDns.svg";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Active } from "@/App";

const navigation = {
  general: [
    {
      title: "Searching",
      icon: Search,
      url: "/veilleur/searching"
    },
    {
      title: "Results",
      icon: FileText,
      url: "/veilleur/results"
    }
  ],
  support: [
    {
      title: "Settings",
      icon: Settings,
      url: "#"
    },
    {
      title: "Help center",
      icon: Headphones,
      url: "#"
    }
  ],
  logout: {
    title: "Log out",
    icon: LogOut,
    url: "#"
  }
};

export default function AppSidebar({}) {
  const { activeItem, setActiveItem } = useContext(Active);
  const navigate = useNavigate();

  const handleClick = (title) => {
    navigate(title.toLowerCase());
  };
  const HandleLogOut = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/users/sign_out", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`
        }
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
  return (
    <Sidebar className="text-black font-bold">
      <SidebarHeader className="pb-4 pt-5">
        <div className="flex items-center gap-2 px-2 ">
          <img src={TrackDns} alt="logo" className="h-9 w-9" />
          <span className="text-xl font-bold">TrackDNS</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-sm font-bold text-black">
            General
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.general.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => handleClick(item.title)} // Set active item on click
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

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-2 text-sm font-bold text-black">
            Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.support.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => handleClick(item.title)} // Set active item on click
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
        <SidebarGroup className="mt-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key={navigation.logout.title}>
                <SidebarMenuButton
                  asChild
                  onClick={HandleLogOut}
                  className="gap-3 rounded-lg px-2 hover:bg-gray-100 font-bold text-black"
                >
                  <button>
                    <navigation.logout.icon className="h-5 w-5" />
                    <span>{navigation.logout.title}</span>
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
