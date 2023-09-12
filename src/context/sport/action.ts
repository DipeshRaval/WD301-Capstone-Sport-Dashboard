import { API_ENDPOINT } from "../../config/constants";

export const fetchSport = async (dispatch: any) => {
  try {
    dispatch({ type: "FETCH_SPORT_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/sports`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    dispatch({ type: "FETCH_SPORT_SUCCESS", payload: data.sports });
  } catch (error) {
    console.log("Error fetching matches:", error);
    dispatch({ type: "FETCH_SPORT_FAILURE", payload: "Unable to load sports" });
  }
};
