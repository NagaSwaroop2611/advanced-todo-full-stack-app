import React, { useCallback, useMemo, useState } from "react";
import TaskListSidebar from "./TaskListSidebar";
import clsx from "clsx";
import FolderImg from "../assets/folder-white.svg";
import SearchTasks from "./SearchTasks";
import TaskTile from "./TaskTile";
const TaskList = ({
  tasks = [],
  fetchAllTasks,
  showViewTaskScreen,
  showEditTaskScreen,
  setActiveTaskId,
  setTasks,
  changeTaskStatus,
  boardView,
  setBoardView,
  showCreateTaskScreen,
}) => {

  
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTask, setFilteredTask] = useState([]);

  const showSearchResults = useMemo(
    () => Boolean(searchQuery.trim().length),
    [searchQuery]
  );

  const handleViewTask = useCallback((taskId) => {
    setActiveTaskId(taskId);
    showViewTaskScreen();
  }, []);

  return (
    <div className="task-list-screen content-section">
      {/* {left side} */}
      <div className="task-list-left-container">
        <p className="task-heading">🔥 Task</p>
        {/* Task sidebar */}
        <TaskListSidebar
          boardView={boardView}
          setBoardView={setBoardView}
          setTasks={setTasks}
        />
      </div>
      {/* Right Sidebar */}
      <div className="task-list-right-container">
        {/* Header with search and add task button */}
        <div className="task-list-right-header">
          {/* Search task component */}
          <SearchTasks
            placeholder="Search title and description"
            tasks={tasks}
            setFilteredTask={setFilteredTask}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {/* Button to add new task */}
          <button
            className="add-task-btn cursor-pointer"
            onClick={showCreateTaskScreen}
          >
            {" "}
            <img src={FolderImg} alt="Add task icon" />
            Add New Task
          </button>
        </div>

        {/* Task list Section */}
        <div
          className={clsx("task-list-right-section", boardView && "board-view")}
        >
          {/* If User has searched anything, show search results; otherwise show tasks based on sidebar options */}
          
          {(showSearchResults ? filteredTask : tasks).map((task) => (
            <TaskTile
              key={`${task._id}-${
                showSearchResults ? "result-tile" : "task-tile"
              }`}
              task={task}
              onClick={() => handleViewTask(task._id)}
              fetchAllTasks={fetchAllTasks}
              changeTaskStatus={changeTaskStatus}
              setActiveTaskId={setActiveTaskId}
              showEditTaskScreen={showEditTaskScreen}
              boardView={boardView}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
