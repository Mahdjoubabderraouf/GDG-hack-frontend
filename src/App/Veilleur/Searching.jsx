import React, { useContext, useEffect, useState } from "react";
import { Active } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ResearchCard from "@/components/ui/ResearchCard";
import search from "@/assets/search.svg";
import { Loader2 } from "lucide-react";
import { list } from "postcss";

// in this commpenent u must get suggestions , my research
// in this comp u must post a search using (resources, keywords) all of them are in My resarch state

function Searching() {
  const { setActiveItem } = useContext(Active);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/wm_sources", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, 
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const fetchedReasearches = data.data.map((element, index) => {
        return {
          id: element.id,
          url: element.url ? element.url : "ApiNews",
          keywords: element.keywords ? element.keywords.split(",") : null,
        };
      });

      console.log(fetchedReasearches);

      console.log(typeof fetchedReasearches);

      setMyResearch([...fetchedReasearches]);
    } catch (error) {
      console.error("Error fetching name:", error);
    }
  };

  useEffect(() => {
    if (setActiveItem != "Searching") setActiveItem("Searching");
    fetchData();
  }, []);

  const handelValidate = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/wm_sources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },

      body:
        activeButton === "Api"
          ? JSON.stringify({
              apikey: ApiKey,
              keywords: ListToString(keywords),
              type_source: "newsapi"
            })
          : JSON.stringify({
              url: newUrl,
              apikey: "sgai-7f291f73-a71d-4577-b558-f77a5c3262f5",
              type_source: "manual"
            }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    console.log(JSON.stringify(keywords));

    setMyResearch([
      ...myResearch,
      {
        id: myResearch.length + 1,
        url: activeButton === "Api" ? "ApiNews" : Resources[0].url,
        keywords: activeButton === "Api" ? keywords : null,
      },
    ]);

    setKeywords([]);
    setRessources([]);
    setKeywordActive(false);
  };

  const handelDeletOneReaserch = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/wm_sources/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Add the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    fetchData();
  };

  const [activeButton, setActiveButton] = useState("Api");
  const [suggestions, setSuggestions] = useState([
    { id: 1, name: "suggestion1" },
    { id: 2, name: "suggestion2" },
    { id: 3, name: "suggestion3" },
    { id: 4, name: "suggestion4" },
  ]);

  const [suggestionState, setSuggestionState] = useState(
    suggestions.length > 0
  );
  const [keywords, setKeywords] = useState([]);
  const [keywordActive, setKeywordActive] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [ApiKey, setApiKey] = useState("");
  const [Resources, setRessources] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [myResearch, setMyResearch] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);


  const handleClick = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/wm_results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
    } catch (err) {
      console.log(err.message);
    } 
  };

  const ListToString = (list) => {
    let str = "";
    list.forEach((element, index) => {
      if (index != list.length - 1) {
        str += element.name + ",";
      } else {
        str += element.name;
      }
    });
    return str;
  };

  return (
    <div>
      <h1>Searching</h1>
      <p>
        Try to add your resources and chose your options to deepen your research
        and achieve better results .
      </p>
      <div className="grid grid-rows-[4fr] grid-cols-[3fr_2fr] mt-5 gap-x-8 gap-y-4 mr-6">
        <div className="py-4 px-20 bg-second rounded-xl w-full row-span-2 relative">
          <h5>Add Recources</h5>
          <div className="flex font-bold text-lg justify-center mt-5 gap-3">
            <Button
              className={`${
                activeButton === "Api" ? "" : "bg-white hover:bg-gray-300"
              }`}
              onClick={() => setActiveButton("Api")}
            >
              Api News
            </Button>
            <Button
              className={`${
                activeButton === "Scraping site"
                  ? ""
                  : "bg-white hover:bg-gray-300"
              }`}
              onClick={() => setActiveButton("Scraping site")}
            >
              Scraping site
            </Button>
          </div>

          <div className="mt-5 relative">
            <Input
              placeholder={
                activeButton === "Api" ? "Add Api Key" : "Add Scraping site"
              }
              className="h-12 rounded-lg font-bold"
              value={activeButton === "Api" ? ApiKey : newUrl}
              onChange={(e) =>
                activeButton === "Api"
                  ? setApiKey(e.target.value)
                  : setNewUrl(e.target.value)
              }
            />
            <Button
              onClick={() => {
                if (newUrl === "" && ApiKey === "") {
                  alert("Please add a resource");
                  return;
                }
                if (activeButton === "Api") {
                  setKeywordActive(true);
                }

                if (activeButton === "Scraping site") {
                  setKeywordActive(false);
                }

                setSuggestionState(false);
                setRessources([{ id: Resources.length + 1, url: newUrl }]);
              }}
              className="absolute h-2 py-4 top-2 right-3"
            >
              Add
            </Button>
          </div>

          {suggestionState && (
            <div className="flex gap-2 items-center py-3 w-fit ">
              <span className="font-bold "> suggestion: </span>
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion.id}
                  className=" bg-white py-1 h-8 hover:bg-gray-300"
                >
                  {suggestion.name}
                </Button>
              ))}
            </div>
          )}
          {Resources.length > 0 && (
            <div className="flex gap-2 items-center py-3 w-fit ">
              <span className="font-bold "> Ressource: </span>
              {Resources.map((ressource) => (
                <Button
                  key={ressource.id}
                  className=" bg-white py-1 h-8 hover:bg-gray-300"
                >
                  {ressource.url}
                </Button>
              ))}
            </div>
          )}
          {keywordActive && (
            <div className="py-6  bg-second rounded-xl w-full row-span-2">
              <h5>Add keyword</h5>

              <div className="mt-5 relative">
                <Input
                  placeholder="Add keyword"
                  className="h-12 rounded-lg font-bold"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                ></Input>
                <Button
                  className="absolute h-2 py-4 top-2 right-3"
                  onClick={() => {
                    if (keyword === "") {
                      alert("Please add a keyword");
                      return;
                    }
                    setKeywords([
                      ...keywords,
                      { id: keywords.length + 1, name: keyword },
                    ]);
                    setKeyword("");
                  }}
                >
                  Add
                </Button>
              </div>
              {keywords && (
                <div className="flex gap-2 items-center py-3 w-fit ">
                  <span className="font-bold "> Keywords: </span>
                  {keywords.map((key) => (
                    <Button
                      key={key.id}
                      className=" bg-white py-1 h-8 hover:bg-gray-300"
                    >
                      {key.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
          <Button
            className={`py-3 justify-center w-fit absolute bottom-4 right-4 ${
              Resources.length === 0 ? "hidden" : ""
            }`}
            onClick={handelValidate}
          >
            Validate
          </Button>
        </div>
        <div className="p-5 bg-second rounded-xl w-full ">
          <h3>My research</h3>
          <div className=" grid grid-cols-2 font-bold text-lg justify-center mt-5 gap-3">
            {myResearch.map((research) => (
              <ResearchCard
                key={research.id}
                title={research.url}
                keyword={research.keywords}
                handelDelet={() => handelDeletOneReaserch(research.id)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          {!searchClicked && (
            <Button
              className="gap-0.5 py-3 justify-center w-fit"
              onClick={() => {
                handleClick()
                setSearchClicked(true);
                setTimeout(() => {
                  setSearchClicked(false);
                }, 1000);
              }}
            >
              <img className="h-6" src={search} alt="" />
              <span className="text-lg">Search</span>
            </Button>
          )}
          {searchClicked && (
            <Button disabled className="gap-0.5 py-3 justify-center w-fit">
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export { Searching };
