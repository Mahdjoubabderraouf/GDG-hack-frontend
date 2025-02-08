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

  return (
    <form onSubmit={handleSubmit} className="min-h-full w-full m-3 p-5 ">
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
          <label htmlFor="eventLogo">
            <h3>Event Logo</h3>
          </label>
          <div className="w-full rounded-full h-12 bg-[#69CFF7] flex items-center px-2">
            <input
              ref={eventLogoRef}
              id="eventLogo"
              name="eventLogo"
              type="file"
              accept="image/*"
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="w-1/2 mx-2 my-6">
          <label htmlFor="members">
            <h3>Members</h3>
          </label>
          <div className="w-full rounded-full h-12 bg-[#69CFF7] flex items-center px-2">
            <input
              ref={membersRef}
              id="members"
              name="members"
              type="file"
              accept=".xls, .xlsx"
              className="w-full"
            />
          </div>
        </div>
        <div className="w-1/2 mx-2 my-6">
          <label htmlFor="managers">
            <h3>Managers</h3>
          </label>
          <div className="w-full rounded-full h-12 bg-[#69CFF7] flex items-center px-2">
            <input
              ref={managersRef}
              id="managers"
              name="managers"
              type="file"
              accept=".xls, .xlsx"
              className="w-full"
              
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full pt-8">
        <button
          className="h-10 w-36 bg-[#0DE27B] rounded-full border-2 border-black font-bold"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
