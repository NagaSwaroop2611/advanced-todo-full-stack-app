import moment from "moment-timezone";
import Task from "../models/taskModel.js";

const newTask = async (req,res) =>{
  try {
    // Extract data from request body
    const {title, description, due_date, labels} =req.body;
    
    // Validate incoming data
    if(!title || !description){
      return res.
        status(400)
        .json({message: "Title and description are required format"});
    }
    let isDueDate;
    if(due_date){
      isDueDate = moment.tz(due_date,"Asia/Kolkata").toDate();
    }
    console.log(title,description,due_date,labels);

    // Create a new task
    const newTask = await Task.create({
      title,
      description,
      due_date: isDueDate,
      labels,
    });
    // console.log(task);
    

    res.status(201).json({
      success : true,
      message: "Task created successfully",
      task : newTask,
    });
  } catch (error) {
    console.error("Error while creating a task",error);
    res.status(500).json({
      success: false,
      meassage: error.message,
    });
  }
};

const getTask = async (req,res) => {
  try {
    console.log(req.query);
    const { page, sort_by, sort_type, status, limit=10, labels} = req.query;

    let options = {};
    let query = {};

    // Set sort option
    if(sort_by && ["added_on","due_date"].includes(sort_by)){
      const sortOptions = {};
      sortOptions[sort_by] = sort_type === "desc" ? -1 : 1;
      options.sort = sortOptions;
      // {sort : {added_on:1}}
    }

    // set filter options
    if(status && status.length>0){
      const statusItems = JSON.parse(status);
      query.status ={$in: statusItems};
      // query = {status:{$in:statusItems}}
    }

    // set labels options
    if(labels && labels.length>0){
      const labelItems = JSON.parse(labels);
      console.log(labels,labelItems);
      query.labels ={$in: labelItems};
      // query = {labels:{$in:labelItems}}
    }

    // Pagination
    if(page){
      options.limit = parseInt(limit);
      options.skip =(parseInt(page) - 1) * parseInt(limit) ;
    }
    // fetch tasks
    const tasks = await Task.find(query,null,options);

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Failed to fetch data");
    res.status(500).json({
      success:false,
      message: error.message
    });
  }
}

const updateTask = async (req,res) =>{
  try {
    const { id } = req.params;
    console.log(id);
    
    const {title,description,due_date} = req.body;

    if(!id){
      return res
        .status(404)
        .json({
          sucess:false,
          message :"Task id required",
        });
    }

    const task = await Task.findById(id);

    if(!task){
      return res
        .status(404)
        .json({sucess:false, message: "Task not found"});
    }
    if(title) task.title = title;
    if(description) task.description = description;
    if(due_date) task.due_date = due_date;
    if(!due_date) task.due_date = null;


    const updatedTask = await task.save();
    res.status(200).json({
      success: true,
      message:"Print me",
      task : updatedTask
    });

  } catch (error) {
    console.error("Failed to update Task");
    res.status(500).json({
      success:false,
      message: error.message
    });
  }
} 

const getLabels = async (req,res) => {
  try {
    const labels = await Task.distinct("labels");

    res.status(200).json({
      success: true,
      labels,
    });
  } catch (error) {
    console.error("Failed to fetch labels");
    res.status(500).json({
      success:false,
      message: error.message
    });
  }
}

const updateLabels = async (req,res) => {
  try {
    const {id} = req.params
    const {labels} = req.body; 

    if(!id || !labels || !Array.isArray(labels)){
      return res.status(404).json({
        success: false,
        message: "Invalid Input Data",
      });
    }

    const task = await Task.findById(id);
    if(!task){
      res.status(200).json({
        success: false,
        message: "No Task Found",
      });
    }

    task.labels = labels //update labels with new array

    const updatedTask = await task.save();
    res.status(200).json({
      success: true,
      task: updatedTask
    }); 
  } catch (error) {
    console.error("Failed to add label in Task");
    res.status(500).json({
      success:false,
      message: error.message
    });
  }
}

const updateStatus = async(req,res) => {
  try {
    const {id} = req.params;
    const {status} = req.body;

    if(!id || !status){
      return res.status(404).json({
        success: false,
        message: "Invalid Input",
      });
    }

    if(!["Open","Completed","In-Progress"].includes(status)){
      return res.status(404).json({
        success: false,
        message: "Invalid Status Value",
      });
    }

    const task = await Task.findById(id);

    if(!task){
      res.status(200).json({
        success: false,
        message: "No Task Found",
      });
    }

    task.status = status;
    // console.log(task.status);
    
    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      task: updatedTask,
    });
  } catch (error) {
    console.error("Failed to update status");
    res.status(500).json({
      success:false,
      message: error.message
    });
  }
}

const deleteTask = async(req,res) => {
  try {
    // get the id from req.params
    const {id} = req.params;

    // Validate the id
    if(!id){
      return res.status(400).json({
        success:false,
        message : "Id not provided",
      });
    }

    // delete the document using findBtIdAndDelete()
    await Task.findByIdAndDelete(id);
    // const tasks = await Task.find({});
    // send a response
    res.status(200).json({
      success:true,
      // tasks,
      message:"Task is succesfully deleted"
    });
  } catch (error) {
    console.log("Failed to delete the task",error);
    res.status(400).json({
      success : false,
      message : "Failed to delete the task",
    });
  }
}



export {
  newTask, 
  getTask, 
  updateTask, 
  getLabels, 
  updateLabels,
  updateStatus,
  deleteTask,
};