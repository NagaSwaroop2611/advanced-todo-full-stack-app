import { LucideTag, X } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import getLabelsAPI from "./api/getLabels.js";
import updateLabelsAPI from "./api/updateLabels.js";
import TagIcon from "../assets/blue-tag-hollow.svg";


const LabelSelector = ({
  task,
  selectedLabels,
  setSelectedLabels,
  placeholder = "Type a label",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [labels, setLabels] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [matchingLabels, setMatchingLabels] = useState([]);

  const dropdownRef = useRef(null);
  const taskId = task._id;

  const toggleSelector = useCallback(() => setIsOpen((isOpen) => !isOpen), []);

  const handleSetMatchingLabels = useCallback(
    (matchingLabelsToset) => {
      const filteredLabels = matchingLabelsToset.filter(
        (label) => !selectedLabels.includes(label)
      );
      setMatchingLabels(filteredLabels);
    },
    [selectedLabels]
  );

  const handleGetLabelResponse = useCallback(
    (responseData) => {
      setLabels(responseData.labels);
      handleSetMatchingLabels(responseData.labels);
    },
    [handleSetMatchingLabels]
  );

  //common error handle

  const handleError = useCallback((errMessage) => {
    console.error(errMessage);
    toast.error(errMessage);
    setIsOpen(false);
  }, []);

  //handle update response

  const handleUpdateResponse = useCallback(() => {
    //fetch all labels again after updating active task in backhand. labels are selected again if linked to onother task
    getLabelsAPI(handleGetLabelResponse, handleError);
  }, [handleError, handleGetLabelResponse, isOpen]);

  useEffect(() => {
    if (isOpen) getLabelsAPI(handleGetLabelResponse, handleError);
  }, [handleError, handleGetLabelResponse, isOpen]);

  //update label useEffect

  useEffect(() => {
    updateLabelsAPI(selectedLabels, taskId, handleUpdateResponse, handleError);
  }, [selectedLabels, taskId, handleUpdateResponse, handleError]);

  //clicking outside the label ==> close the drop down
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleInputChange = useCallback(
    (event) => {
      const inputValue = event.target.value;
      setSearchInput(inputValue);

      const matching = labels.filter((label) => label.toLowerCase());

      handleSetMatchingLabels(matching);
    },
    [handleSetMatchingLabels, labels]
  );

  const handleLabelSelect = useCallback(
    (label) => {
      //check if label is already selected
      if (!selectedLabels.includes(label)) {
        setSelectedLabels((prevSelectedLabels) => [
          ...prevSelectedLabels,
          label,
        ]);
      }
    },
    [handleSetMatchingLabels, selectedLabels, setSelectedLabels]
  );

  const handleLabelDeselect = useCallback(
    (label) => {
      setSelectedLabels((prevSelectedLabels) =>
        prevSelectedLabels.filter((item) => item !== label)
      );
      setSearchInput("");
      handleSetMatchingLabels([]);
    },
    [handleSetMatchingLabels, setSelectedLabels]
  );

  const handleCreatedLabel = useCallback(() => {
    const newLabel = searchInput.trim();
    if (newLabel !== "" && !labels.includes(newLabel)) {
      setLabels((prevLabels) => [...prevLabels, newLabel]);
      setSelectedLabels((prevSelectedLabels) => [
        ...prevSelectedLabels,
        newLabel,
      ]);
    }
  }, [handleSetMatchingLabels, labels, searchInput, setSelectedLabels]);

  const isTyping = useMemo(
    () => Boolean(searchInput.trim().length),
    [searchInput]
  );

  return (
    <div className="label-selector-container" ref={dropdownRef}>
      <div
        className="view-task-info-box clickable flex"
        onClick={toggleSelector}
      >
        <img src={TagIcon} alt="Labels Icon" />

        <p className="label-12">Labels</p>
      </div>
      {isOpen && (
        <div className="label-LabelSelector label-12">
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder={placeholder}
          />

          <div className="labels-list-overflow">
            {!isTyping && (
              <ul className="selected-labels-list">
                {selectedLabels.map((label) => (
                  <li key={`${label}-selected`} className="selected-label">
                    <LucideTag width={13} height={13} />
                    {label}
                    <button onClick={() => handleLabelDeselect(label)}>
                      <X />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <ul className="matching-label-list">
              {matchingLabels.map((label) => (
                <li
                  key={`${label}-listed`}
                  onClick={() => handleLabelSelect(label)}
                  className="matching-label"
                >
                  <LucideTag width={13} height={13} />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {isTyping && !labels.includes(searchInput) && (
            <button onClick={handleCreatedLabel} className="create-label-btn">
              Create
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LabelSelector;