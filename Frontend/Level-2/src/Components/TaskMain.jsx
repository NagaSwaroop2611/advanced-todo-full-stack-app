import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Loading from './ui/Loading';
import NoTask from './NoTask';
import CreateTask from './CreateTask';
import ViewTask from './ViewTask';
import EditTask from './EditTask';
import TaskList from './TaskList';
import fetchTaskAPI from "./api/fetchTask.js";

const TaskMain = () => {
  // we manage current screen/routing through state in a page application
  const [currComponent,setCurrComponent] = useState("loading");
  const [tasks, setTasks] = useState([]);
  const [activeTaskId,setActiveTaskId] = useState("");
  const [boardView,setBoardView] = useState(false);
  
  const activeTask = useMemo(
    () => tasks.find((task) => task._id === activeTaskId),
    [tasks, activeTaskId]
  );

  const showNoTaskScreen = useCallback(function(){
    setCurrComponent("noTask");
  },[]);

  const showTaskListScreen = useCallback(function(){
    setCurrComponent("taskList");
  },[]);

  const showCreateTaskScreen = useCallback(function(){
    setCurrComponent("createTask");
  },[]);

  const showViewTaskScreen = useCallback(function(){
    setCurrComponent("viewTask");
  },[]);

  const showEditTaskScreen = useCallback(function(){
    setCurrComponent("editTask");
  },[]);

  // API handling
  const handleResponse = useCallback(function(responseData){
    const extractedTasks = responseData.tasks ;
    // console.log(extractedTasks);
    setTasks(extractedTasks);
    if(extractedTasks.length){
      showTaskListScreen();
    }else{
      showNoTaskScreen();
    }
  },[]);

  const handleError = useCallback(function(errorMessage){
    alert(errorMessage);
    console.log(errorMessage);
  },[])

  const fetchAllTasks = useCallback(function(){
    fetchTaskAPI(handleResponse,handleError);
  },[handleResponse,handleError])

  // API handing we use useEffect
  useEffect(()=>{
    fetchAllTasks();
  },[fetchAllTasks]);

  const changeTaskStatus = useCallback(function(status,taskId){
    setTasks((prevTasks)=>{
      return prevTasks.map((task) =>{
        if(task._id===taskId){
          return {...task,status};
        }
        return task;
      })
    })
  })

  return (
    <>
      {currComponent === "loading" && <Loading/>}
      <div id="container-div">
        {currComponent === "noTask" &&  (
          <NoTask
            showCreateTaskScreen = {showCreateTaskScreen}
          />
        )}
        {currComponent === "taskList" && (
          <TaskList
            tasks = {tasks}
            fetchAllTasks = {fetchAllTasks}
            showCreateTaskScreen={showCreateTaskScreen}
            showViewTaskScreen={showViewTaskScreen}
            showEditTaskScreen = {showEditTaskScreen}
            setActiveTaskId={setActiveTaskId}
            setTasks={setTasks}
            changeTaskStatus={changeTaskStatus}
            boardView={boardView}
            setBoardView={setBoardView}
          />)}
        {currComponent === "createTask" && (
          <CreateTask
            fetchAllTasks = {fetchAllTasks}
            showTaskListScreen = {showTaskListScreen}
          />
        )}
        {currComponent === "viewTask" && (
          <ViewTask 
            task={activeTask}
            setActiveTaskId={setActiveTaskId}
            fetchAllTasks={fetchAllTasks}
            showEditTaskScreen={showEditTaskScreen}
            showTaskListScreen={showTaskListScreen}
            changeTaskStatus={changeTaskStatus}
          />
        )}
        {currComponent === "editTask" && (
          <EditTask
            task = {activeTask}
            fetchAllTasks ={fetchAllTasks}
            showTaskListScreen={showTaskListScreen}
          />
        )}
      </div> 
    </>
  )
}

export default TaskMain;
