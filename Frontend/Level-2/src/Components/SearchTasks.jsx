import React, { useCallback, useEffect, useRef, useState } from "react";
import Search from "../assets/search.svg";

const SearchTasks = ({
  placeholder,
  tasks,
  setFilteredTask,
  searchQuery,
  setSearchQuery,
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // 1. set a timeout to update the actual searchQuery state
    const handler = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300);
    
    
    //2.Return a cleanup function
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  // const timeIdRef = useRef(null);
  useEffect(() => {
    //perform search logic and filter based on search query
    const filteredTask = tasks.filter((task) => {
      const case1 = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      // console.log("Hi");
      
      const case2 = task.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return case1 || case2;
    });
    
    setFilteredTask(filteredTask);
    // console.log(filteredTask);
  }, [searchQuery, setFilteredTask, tasks]);

  //debounce search input change
  // const handleSearchInputChange = useCallback(
  //   (event) => {
  //     const query = event.target.value;

  //     //clear the previous Time

  //     clearTimeout(timeIdRef.current);

  //     //Set a new timeout and update the ref
  //     timeIdRef.current = setTimeout(() => {
  //       setSearchQuery(query);
  //     }, 300);
  //   },
  //   [setSearchQuery]
  // );

  return (
    <div className="search-box-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      />
      <img src={Search} alt="search icon" />
    </div>
  );
};

export default SearchTasks;
