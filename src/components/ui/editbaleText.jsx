import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const EditableText = ({
  text,
  onSave,
  tag: Tag = "span",
  isMultiline = false,
  className = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);

  const handleDoubleClick = () => {
    setIsEditing(true); // Enable edit mode on double-click
  };

  const handleBlur = () => {
    setIsEditing(false); // Exit edit mode on blur
    if (onSave) onSave(currentText); // Call onSave callback if provided
  };

  const handleChange = (event) => {
    setCurrentText(event.target.value); // Update state with input value
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !isMultiline) {
      setIsEditing(false); // Save and exit edit mode on pressing Enter (single-line only)
      if (onSave) onSave(currentText);
    }
  };

  return (
    <div className=" my-2">
      {isEditing ? (
        isMultiline ? (
          <Textarea
            value={currentText}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            className={`border text-[#0404046b] font-bold text-xl border-gray-300 rounded p-2 ${className}`}
          />
        ) : (
          <input
            type="text"
            value={currentText}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            autoFocus
            className={`border border-gray-300 rounded p-1 ${className}`}
          />
        )
      ) : (
        <Tag className={className} onDoubleClick={handleDoubleClick}>
          {currentText}
        </Tag>
      )}
    </div>
  );
};

export default EditableText;
