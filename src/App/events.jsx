import { Button } from "@nextui-org/button";
import SearchInput from "../components/ui/SearchInput";
import { Plus } from "lucide-react";
const events = () => {
  const hackathons = [
    { id: 1, name: "Hackathon 1", img: "https://via.placeholder.com/150" },
    { id: 2, name: "Hackathon 2", img: "https://via.placeholder.com/150" },
    { id: 3, name: "Hackathon 3", img: "https://via.placeholder.com/150" },
    { id: 4, name: "Hackathon 4", img: "https://via.placeholder.com/150" },
    { id: 5, name: "Hackathon 5", img: "https://via.placeholder.com/150" },
    { id: 6, name: "Hackathon 6", img: "https://via.placeholder.com/150" }
  ];
  return (
    <>
      <div className="flex gap-5 items-center">
        <SearchInput />
        <Button className="bg-first">
          <span>Add</span>
          <Plus />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {hackathons.map((hackathon) => (
          <div
            key={hackathon.id}
            className="border rounded-lg overflow-hidden hover:scale-[102%] duration-150 shadow-sm"
          >
            <img
              src={hackathon.img}
              alt={hackathon.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-center">{hackathon.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default events;
