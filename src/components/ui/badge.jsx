import { useState } from "react";

const Badge = ({ text = "Default", color = "blue" }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <span
      className={`inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-${color}-800 bg-${color}-100 rounded-sm dark:bg-${color}-900 dark:text-${color}-300`}
    >
      {text}
      <button
        type="button"
        className={`inline-flex items-center p-1 ms-2 text-sm text-${color}-400 bg-transparent rounded-xs hover:bg-${color}-200 hover:text-${color}-900 dark:hover:bg-${color}-800 dark:hover:text-${color}-300`}
        onClick={() => setVisible(false)}
        aria-label="Remove"
      >
        <svg
          className="w-2 h-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Remove badge</span>
      </button>
    </span>
  );
};

export default Badge;
