async function getLabelsAPI(handleResponse,handleError){
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = "/api/v2/labels";

    const url =new URL(endpoint,baseUrl);

    const response = await fetch(url);
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

export default getLabelsAPI;