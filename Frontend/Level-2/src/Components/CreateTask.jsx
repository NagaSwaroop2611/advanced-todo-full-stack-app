import React, { useCallback, useState } from "react";
import UserIcon from "../assets/user-icon.png";
import InputField from "./ui/InputField";
import createTaskAPI from "./api/createTask.js"
import TitleImg from "../assets/title-placeholder-img.svg";
import Memo from "../assets/memo.svg";
import  Calendar from "../assets/calendar.svg";
import clsx from "clsx";

const CreateTask = ({fetchAllTasks,showTaskListScreen}) => {

  // 3 states related to our task 
  const [taskTitle,setTaskTitle] = useState("");
  const [taskDescription,setTaskDescription] = useState("");
  const [taskDueDate,setTaskDueDate] = useState();

  

   // State to manage whether API call is finished or not
  const [loading,setLoading] = useState(false);

  //useCallback is used to avoid infinite rendering of component
  const handleTitleChange = useCallback(function(event){
    setTaskTitle(event.target.value);
  },[]);

  const handleDescriptionChange = useCallback(function(event){
    setTaskDescription(event.target.value);
  },[]);

  const handleDateChange = useCallback(function(date){
    setTaskDueDate(date);
  },[]);

  //validation
  const validate = useCallback(function(values){
    const {taskTitle, taskDescription} = values;
    if(taskTitle && taskDescription){
      return true;
    }else{
      const errorMsg = "Please fill out title and decription";
      console.error(errorMsg);
      alert(errorMsg);
      return false;
    }
  },[]);

  const handleResponse = useCallback(
    function(responseData){
      if(responseData.success){
        console.log("Handled Succesffuly");
        fetchAllTasks();
      }
    },[fetchAllTasks]
  );

  const handleError = useCallback(function(errorMsg){
    alert(errorMsg);
    console.log(errorMsg);
  },[]);

  const createNewTask = useCallback(function(values){
    createTaskAPI(values,handleResponse,handleError,setLoading)
  },[handleResponse,handleError]);

  const handleAddTask = useCallback(()=>{
    const values = {
      taskTitle,
      taskDescription,
      taskDueDate,
    };

    const isValid = validate(values);

    if(isValid) createNewTask(values);
  }, [createNewTask, taskDescription, taskDueDate, taskTitle, validate])

  return (
    <div className="content-section create-task-section">
      <div className="create-task-card">
        <img src={UserIcon} alt="create icon" width={263} />
        <h1 className="create-task-title-text">
          Create New Task
        </h1>
        {/* custom input field for title */}
        <InputField 
          name={"new-task-title"} 
          value={taskTitle}
          onChange={handleTitleChange}
          label={"Title"}
          type={"text"}
          inputImg={TitleImg}
          placeholder={"Title"} 
        />
        {/* custom input field f or description */}
        <InputField 
          name={"new-task-description"} 
          value={taskDescription}
          onChange={handleDescriptionChange}
          label={"Description"}
          type={"textarea"}
          inputImg={Memo}
          placeholder={"description"}
          className={"input-margin"} 
        />
        {/* custom input field for due_date */}
        <InputField 
          name={"new-task-due-date"} 
          value={taskDueDate}
          onChange={handleDateChange}
          label={"Due Date"}
          type={"date"}
          inputImg={Calendar}
          placeholder={"due date"}
          className={"input-margin"} 
        />
        <div className="add-edit-task-btns">
          <button 
            className={clsx(
              "btn","add-task-btn",
              loading ? "disabled-add-task-btn" : "cursor-pointer"
            )} 
            disabled={loading} 
            onClick={handleAddTask}
          >
            {loading ? "Adding Task" : "Add Task"}
          </button>
          <button 
            className="btn cancel-btn cursor-pointer"
            onClick={showTaskListScreen}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;







