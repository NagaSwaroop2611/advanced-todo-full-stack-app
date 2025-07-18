async function createTaskAPI(values,handleResponse,handleError,setLoading) {
  setLoading(true)
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = "/api/v2/task";
    const url = new URL(endpoint,baseUrl);
    // console.log(url);
    
    // convert the values to JSON form
    const requestBody = JSON.stringify({
      title:values.taskTitle,
      description: values.taskDescription,
      due_date:values.taskDueDate?.toISOString(),
    });

    const response = await fetch(url,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:requestBody,
    });

    const jsonData = await response.json();

    if(!response.ok){
      const errorMessage = jsonData.message || "Unknown Error occured";
      throw new Error(errorMessage);
    }

    handleResponse(jsonData);
  } catch (error) {
    handleError(error);
  }
  finally{
    setLoading(false);
  }
}

export default createTaskAPI;