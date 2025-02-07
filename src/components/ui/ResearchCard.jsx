import React from "react";

function ResearchCard({ title, keyword, handelDelet }) {
  return (
    <div className="bg-white p-4 rounded-xl h relative">
      <h6>{title}</h6>
      {/* // condional rendering */}

      {keyword && (
        <div className="text-sm mt-2 ">
          <span>Keywords:</span>
          <li>
            {keyword.map((key, index) => {
              if (index === keyword.length - 1)
                return `${key.name ? key.name : key}`;
              return `${key.name ? key.name : key}, `;
            })}
          </li>
        </div>
      )}
      <div className="absolute top-0 right-1">
        <button onClick={handelDelet} className="p-0.5 mb-1">
          X
        </button>
      </div>
    </div>
  );
}

export default ResearchCard;
