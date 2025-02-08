import React, { useRef } from "react";

export default function AddEvent() {
  const serverIdRef = useRef();
  const eventNameRef = useRef();
  const eventLogoRef = useRef();
  const membersRef = useRef();
  const managersRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      serverId: serverIdRef.current?.value,
      eventName: eventNameRef.current?.value,
      eventLogo: eventLogoRef.current?.files[0],
      members: membersRef.current?.files[0],
      managers: managersRef.current?.files[0],
    };

    console.log("Form submitted with data:", payload);
  };

  const handleFileClick = (ref) => {
    if (ref.current) ref.current.click();
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-full w-full m-3 p-5">
      <label htmlFor="serverId">
        <h3>Server ID</h3>
      </label>
      <input
        ref={serverIdRef}
        id="serverId"
        name="serverId"
        className="w-full rounded-full h-12 bg-[#E9E9E9] p-4"
        placeholder="Enter an ID for your server..."
        type="text"
        required
      />

      <div className="flex flex-row">
        <div className="w-1/2 mx-2 my-6">
          <label htmlFor="eventName">
            <h3>Event Name</h3>
          </label>
          <input
            ref={eventNameRef}
            id="eventName"
            name="eventName"
            className="w-full rounded-full h-12 bg-[#E9E9E9] p-4"
            type="text"
            placeholder="Type here"
            required
          />
        </div>
        <div className="w-1/2 mx-2 my-6">
          <label>
            <h3>Event Logo</h3>
          </label>
          <div
            className="w-full rounded-full h-12 bg-[#69CFF7] flex items-center justify-center px-4 cursor-pointer text-white font-bold"
            onClick={() => handleFileClick(eventLogoRef)}
          >
            Upload Logo
            <input
              ref={eventLogoRef}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="w-1/2 mx-2 my-6">
          <label>
            <h3>Members</h3>
          </label>
          <div
            className="w-full rounded-full h-12 bg-[#69CFF7] flex items-center justify-center px-4 cursor-pointer text-white font-bold"
            onClick={() => handleFileClick(membersRef)}
          >
            Upload Members
            <input
              ref={membersRef}
              type="file"
              accept=".xls, .xlsx"
              className="hidden"
            />
          </div>
        </div>
        <div className="w-1/2 mx-2 my-6">
          <label>
            <h3>Managers</h3>
          </label>
          <div
            className="w-full rounded-full h-12 bg-[#69CFF7] flex items-center justify-center px-4 cursor-pointer text-white font-bold"
            onClick={() => handleFileClick(managersRef)}
          >
            Upload Managers
            <input
              ref={managersRef}
              type="file"
              accept=".xls, .xlsx"
              className="hidden"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full pt-8">
        <button
          className="h-10 w-36 bg-[#0DE27B] rounded-full border-2 text-white font-bold"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
