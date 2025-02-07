import React, { useContext, useEffect, useState } from "react";
import { Active } from "@/App";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import TrackDns from "@/assets/TrackDns.svg";
import { useSidebar } from "@/components/ui/sidebar";
import profile from "@/assets/profile.svg";
import notification from "@/assets/notification.svg";
import help from "@/assets/help.svg";
import { Profile } from "@/components/ui/Profile";
import EditableText from "@/components/ui/editbaleText";
import category from "@/assets/category.svg";
import feedbackImg from "@/assets/feedback.svg";
import Ai from "@/assets/Ai.svg";
import Danger from "@/assets/danger.svg";
import Maping from "@/assets/Maping.svg";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { OpenModule } from "@/components/ui/module";
import { useParams } from "react-router-dom";

function EditFile() {
  const [activeButton, setActiveButton] = useState("Category");
  const [feedback, setFeedback] = useState("");
  const { toggleSidebar } = useSidebar();
  const [select, setSelect] = useState({
    placeholder: "Category",
    items: [
      {
        label: "Trend",
        value: "0",
      },
      {
        label: "Thread",
        value: "2",
      },
      {
        label: "Technologies evolution",
        value: "4",
      },
    ],
  });
  const listOfButtons = [
    {
      id: 1,
      label: "Category",
      img: category,
      items: [
        {
          label: "Trend",
          value: "0",
        },
        {
          label: "Thread",
          value: "2",
        },
        {
          label: "Technologies evolution",
          value: "4",
        },
      ],
    },
    { id: 2, label: "feedback", img: feedbackImg },
    { id: 3, label: "Ai", img: Ai },
    {
      id: 4,
      label: "Danger",
      img: Danger,
      items: [
        {
          label: "Critical",
          value: "1",
        },
        {
          label: "High",
          value: "3",
        },
        {
          label: "Medium",
          value: "5",
        },
        {
          label: "Low",
          value: "7",
        },
      ],
    },
    { id: 5, label: "Maping", img: Maping },
  ];
  const [file, setFile] = useState({
    title: "File Title",
    content: `Lorem ipsum odor amet, consectetuer adipiscing elit. Tempus cursus auctor nulla nostra mi. Dictumst ac nunc porttitor volutpat nostra nullam taciti morbi. Ridiculus ipsum aenean sem nisi erat inceptos duis potenti. Fusce vel congue sagittis nullam suscipit phasellus ac. Per lectus dui sapien quisque metus rhoncus facilisis. Rutrum hac risus laoreet ligula primis rutrum dis. Posuere ex elit vitae dapibus consequat nec semper amet? Cursus eget enim at duis nam lacus turpis.

Porta ultrices cursus praesent inceptos ipsum posuere sodales. In luctus velit, cursus risus dapibus amet quisque porttitor interdum. Pulvinar nibh sem erat ut orci; dui condimentum commodo. Ac blandit dictum auctor mus praesent maecenas finibus. Curae penatibus nec pellentesque volutpat purus euismod posuere consequat pellentesque. Pulvinar malesuada nostra dignissim sed adipiscing. Orci blandit ut et metus ultrices urna a sollicitudin purus.

Magna senectus dolor ultricies felis accumsan nibh. Porta ridiculus senectus sollicitudin a cubilia dictum. Hendrerit ut consequat metus eros; laoreet pulvinar et mi. Nunc pellentesque diam facilisi rutrum mus elit feugiat. Praesent quisque accumsan feugiat cubilia aliquet suscipit rutrum facilisis ultricies. Dui orci a penatibus quisque natoque tempor potenti lectus. Aeuismod curabitur tristique vulputate porttitor fermentum libero. Montes porttitor ridiculus nullam parturient tempus. Morbi eget erat ut libero et pretium urna feugiat. Massa arcu cubilia aenean ipsum fames aliquam vehicula elit sem.`,
  });
  const { idfile } = useParams();

  useEffect(() => {
    toggleSidebar();
  }, []);
  const [user, setUser] = useState({ name: "kevin" });
  const [date, setDate] = useState(new Date().toDateString());
  const [gpt, setGpt] = useState("intital");
  const [addedSeverity, setAddedSeverity] = useState([]);
  const [addedCategories, setAddedCategories] = useState([]);
  const [feedbackContent, setfeedbackContent] = useState("");

  // Function to handle adding severity
  const handleAddSeverity = (severity) => {
    setAddedSeverity([...addedSeverity, severity]);
  };

  // Function to handle adding category
  const handleAddCategory = (category) => {
    setAddedCategories([...addedCategories, category]);
  };

  // Function to handle adding feedback
  const handleAddFeedback = () => {
    if (feedback.trim()) {
      setfeedbackContent(feedback);
      setFeedback("");
    }
  };

  const findLabelByValue = (value) => {
    // Iterate over the list of buttons
    for (const button of listOfButtons) {
      // If the button has items, check each item's value
      if (button.items) {
        const item = button.items.find((item) => item.value === value);
        if (item) {
          return item.label; // Return the label if found
        }
      }
    }
    return null; // Return null if the value is not found
  };

  return (
    <div className="w-full">
      <div className="px-6 py-8 bg-[#FAFAFA]">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 px-2 ">
              <img src={TrackDns} alt="logo" className="h-12 w-12" />
              <h2 className="font-bold mr-20">TrackDNS</h2>
            </div>
            <div className="">
              <h1>{`Edit File`}</h1>
              <p>Employ applications to adjust your file.</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="hidden lg:flex font-semibold">
              <p>{date}</p>
            </div>

            <div className="gap-2 hidden md:flex">
              <Button className="p-2 min-w-0 rounded-full bg-second hover:bg-[#e3e3e2] ">
                <img
                  className="h-6 w-6"
                  src={notification}
                  alt="notification"
                />
              </Button>
              <Button className="p-2 min-w-0 rounded-full bg-second hover:bg-[#e3e3e2]">
                <img className="h-6 w-6" src={help} alt="help" />
              </Button>
            </div>

            <Profile name={user.name} image={profile} role="Analyst" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[2fr,1fr] gap-10 mt-10 px-16">
        <div className="justify-start ">
          <div className="flex items-center gap-2 justify-between">
            <EditableText
              text={file.title + " " + idfile}
              onSave={(newText) => console.log("Saved header:", newText)}
              tag="h1"
              isMultiline={false}
              className="text-2xl font-bold "
            />
            <div className="flex gap-2">
              <Button
                className={`p-2 min-w-0 rounded-full ${
                  addedSeverity.length ? "bg-[#FF2727]" : "bg-second"
                } hover:bg-[#e3e3e2]`}
                onClick={() => {
                  if (addedSeverity.length === 0) alert("No severity added.");
                  console.log(addedSeverity);
                }}
              >
                {addedSeverity.length === 0
                  ? "No Severity Added"
                  : addedSeverity[0]}
              </Button>
              <Button
                className={`p-2 min-w-0 rounded-full ${
                  addedCategories.length ? "bg-first" : "bg-second"
                } hover:bg-[#e3e3e2]`}
                onClick={() => {
                  if (addedCategories.length === 0) alert("No category added.");
                  console.log(addedCategories);
                }}
              >
                {addedCategories.length === 0
                  ? "No Category Added"
                  : addedCategories[0]}
              </Button>

              {!feedbackContent && (
                <Button
                  className="p-2 min-w-0 rounded-full bg-second hover:bg-[#e3e3e2]"
                  onClick={() => {
                    if (feedbackContent === "") alert("No feedback added.");
                  }}
                >
                  No Feedback Added
                </Button>
              )}

              {feedbackContent && (
                <OpenModule
                  btnName="Show feedback"
                  Title={"Feedback"}
                  deleteAction={() => setfeedbackContent("")}
                  Content={feedbackContent}
                />
              )}
            </div>
          </div>
          <EditableText
            text={file.content}
            onSave={(newText) => console.log("Saved paragraph:", newText)}
            tag="p"
            isMultiline={true}
            className="text-lg"
          />
        </div>
        <div className="flex justify-end gap-5">
          <Select
            onValueChange={(value) => {
              if (value % 2 === 0) {
                handleAddCategory(findLabelByValue(value));
              } else if (value % 2 !== 0) {
                handleAddSeverity(findLabelByValue(value));
              }
            }}
            className="bg-second font-bold w-full "
          >
            <SelectTrigger className="w-[270px]">
              <SelectValue placeholder={select.placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {select.placeholder === "feedback" && (
                  <div className="relative">
                    <Textarea
                      placeholder="Write your feedback here"
                      className="w-full  min-h-[120px]"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                    <div>
                      <Button
                        onClick={handleAddFeedback}
                        className="absolute right-1 bottom-1"
                      >
                        Send
                      </Button>
                      <Button
                        onClick={() => {
                          setFeedback("");
                        }}
                        className="absolute right-24 bottom-1"
                      >
                        Emptey
                      </Button>
                    </div>
                  </div>
                )}
                {select.placeholder === "Ai" && (
                  <div className="flex p-2 gap-3">
                    <h4>OpenAi Summary</h4>
                    {gpt === "intital" ? (
                      <Button
                        onClick={() => {
                          setGpt("pending");
                          setTimeout(() => {
                            setGpt("finich");
                          }, 2000);
                        }}
                      >
                        Get
                      </Button>
                    ) : gpt === "pending" ? (
                      <Button disabled>
                        <Loader2 className="animate-spin" />
                        ...
                      </Button>
                    ) : gpt === "finich" ? (
                      <div className="flex flex-col gap-3">
                        <Button>Show</Button>
                        <Button
                          onClick={() => {
                            setGpt("intital");
                          }}
                        >
                          init
                        </Button>
                      </div>
                    ) : null}
                  </div>
                )}
                {(select.placeholder === "Danger" ||
                  select.placeholder === "Category") &&
                  select.items?.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex flex-col gap-3">
            {listOfButtons.map((button) => (
              <Button
                key={button.id}
                className={`flex items-center min-w-0 p-2 ${
                  activeButton === button.label
                    ? ""
                    : "bg-second hover:bg-[#e3e3e2]"
                }`}
                onClick={() => {
                  setActiveButton(button.label);
                  setSelect({
                    placeholder: button.label,
                    items: button.items,
                  });
                }}
              >
                <img className="h-7" src={button.img} alt={button.label} />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { EditFile };
