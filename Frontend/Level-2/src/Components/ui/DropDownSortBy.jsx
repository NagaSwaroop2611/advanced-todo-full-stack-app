import clsx from "clsx";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ArrowDown from "../../assets/arrow-down.svg";

const DropDownSortBy = ({placeholder,value,onChange,options}) => {
  // State to menu visibity
  const [isMenuOpen,setIsMenuOpen] = useState(false);

  // Reference to select the element
  const selectRef = useRef(null);

  const toggleMenuDisplay = useCallback(() =>{
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  },[]); 

  // close menu clicking outside dropdown
  useEffect(() =>{
    function handleClickOutside(event){
      if(selectRef.current && !selectRef.current.contains(event.target)){
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("click",handleClickOutside);

    return() => {
      document.removeEventListener("mousedown",handleClickOutside);
    }
  })

  // Memoized selected options
  const selectedOption = useMemo(
    () => options.find(option => option.value === value),
    [options,value]
  );

  const handleOptionChange = useCallback(function(option){
    onChange(option);
    setIsMenuOpen(false);
  },[onChange]);

  return (
    <div ref={selectRef} className="dropdown-container">
      <div className="value-container" onClick={toggleMenuDisplay}>
        {/* Display selected value or placeholder */}
        <span className={clsx("dropdown-value", !value && "dropdown-placeholder")}>
          {selectedOption?.label ?? placeholder}
        </span>
        <img src={ArrowDown} alt="Dropdown-icon"/>
      </div>

      {/* display sort options */}
      {isMenuOpen && (
        <div className="menu-list">
          {options.map((option) => {
            return (
              <div
                key={option.value + "-option"}
                className="menu-list-option"
                onClick={() => handleOptionChange(option.value)}
              >
                {option.label}
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default DropDownSortBy;
