import { API_ENDPOINT } from "../../config/constants";

export const fetchTeams = async (dispatch: any) => {
  try {
    dispatch({ type: "FETCH_TEAM_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/teams`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    dispatch({ type: "FETCH_TEAM_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching matches:", error);
    dispatch({ type: "FETCH_TEAM_FAILURE", payload: "Unable to load teams" });
  }
};
