async function updateLabelsAPI(labels,taskId,handleResponse,handleError){
  try {
    // http://localhost:5000/api/v2/task/:id/labels
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL
    const endpoint = `/api/v2/task/${taskId}/labels`;
    
     const url = new URL(endpoint,baseUrl);

     const requestBody = JSON.stringify({labels});

     const response= await fetch(url,{
      method:"PUT",
      headers:{
        "Content-type":"application/json",
      },
      body: requestBody,
     });

     const jsonData = await response.json();

     if(!response.ok){
      const errrorMessage = jsonData.message || "Unknown Error Occured";
      throw new Error(errrorMessage);
     }

     handleResponse(jsonData);
  } catch (error) {
    handleError(error.message);
  }
}

export default updateLabelsAPI;