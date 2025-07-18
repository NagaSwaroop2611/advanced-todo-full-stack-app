async function fetchTaskAPI(handleResponse,handleError,options={}){
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = "/api/v2/tasks";

    const url = new URL(endpoint,baseUrl);

    if(options.sortOption){
      // http://localhost:5000/api/v2/tasks?sort_by=added_on&sort_type=asc
      url.searchParams.append("sort_by",options.sortOption);
      url.searchParams.append("sort_type","asc");
    }

    // http://localhost:5000/api/v2/tasks?status=["Open"]
    if(options.selectedStatus?.length){
      const stringifiedArray = JSON.stringify(options.selectedStatus);
      url.searchParams.append("status",stringifiedArray);
    }

    // http://localhost:5000/api/v2/tasks?labels=["React","assignment"]
    if(options.selectedLabels?.length){
      const stringifiedArray = JSON.stringify(options.selectedLabels);
      url.searchParams.append("labels",stringifiedArray);
    }

    const response = await fetch(url);
    if(!response.ok){
      const errorText = await response.text();
      console.error("error response",errorText);
      throw new Error(`HTTP Error ${response.status}: ${errorText}`);
    }
    const jsonData = await response.json();
    // console.log(jsonData);
    handleResponse(jsonData);
  } catch (error) {
    handleError(error.message);
  }
}

export default fetchTaskAPI;