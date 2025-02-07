import React, { useState } from 'react';

const EvaluationCard = ({ date, title, description, category, severity }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Toggle function for showing full description
  const handleShowDetails = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="bg-[#F3F4ED] rounded-lg p-2 shadow-md flex justify-between items-start w-72 relative">
      {/* Left Section */}
      <div className="flex flex-col space-y-2">
        <span className="bg-white text-black text-center text-xs font-medium px-2 py-1 mb-4 rounded-lg shadow-sm w-28">
          {date}
        </span>
        <h2 className="text-sm font-semibold text-black">{title}</h2>
        
        {/* Truncated Description */}
        <p className="text-sm text-[#04040466] pb-6">
          {showFullDescription ? description : description.length > 150 ? description.substring(0, 150) + '...' : description}
        </p>
      </div>

      {/* Delete Button - Keep Original Position */}
      <div className="flex flex-col items-center">
        <button className="bg-white text-black text-xs px-2 py-2 rounded-lg shadow ">
          {category}
        </button>
      </div>

    
      {/* Details Button - Keep original size and position */}
      <button
        onClick={handleShowDetails}
        className="bg-[#E5FB54] text-black font-semibold text-sm py-2 px-6 rounded-lg hover:bg-gray-100 absolute bottom-4 right-4 "
      >
        {showFullDescription ? 'Hide Details' : 'edit'}
      </button>

      {/* Modal for Full Description */}
      {showFullDescription && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Full Description</h3>
            <p className="text-sm text-[#04040466]">{description}</p>
            <button
              onClick={handleShowDetails}
              className="bg-[#FF2727] text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationCard;
