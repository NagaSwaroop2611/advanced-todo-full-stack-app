async function updateStatusAPI(
  status,
  taskId,
  handleResponse,
  handleError,
  setLoading
) {
  try {
    setLoading(true);
    // http://localhost:5000/api/v2/task/:id/status
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL
    const endpoint = `/api/v2/task/${taskId}/status`;
    
    const url = new URL(endpoint,baseUrl);

    const requestBody = JSON.stringify({status});

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
  }finally{
    setLoading(false);
  }
}

export default updateStatusAPI;
