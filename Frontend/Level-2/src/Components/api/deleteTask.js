async function deleteTaskAPI(taskId, handleResponse, handleError, setLoading) {
  setLoading(true);
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = "/api/v2/task/"+taskId;
    const url = new URL(endpoint,baseUrl);

    const response = await fetch(url, {
      method: "DELETE",
    });

    const jsonData = await response.json();

    // console.log(jsonData);
    
    
    if (!response.ok) {
      const errorMessage = jsonData.message || "unknown error occured";
      // console.log("Hello");
      
      throw new Error(errorMessage);
    }
    // console.log("first");
    
    handleResponse(jsonData);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message;
    handleError(new Error(errorMessage));
  } finally {
    setLoading(false);
  }
}

export default deleteTaskAPI;
