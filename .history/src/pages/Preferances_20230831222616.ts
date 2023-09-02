import { API_ENDPOINT } from "../config/constants";
import { UserPreferances } from "../layout/account/Preferances";

interface Preferances {
  preferences: UserPreferances;
}

export const FetchPreferences = async () => {
  try {
    const token: string | null = localStorage.getItem("authToken");
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      if(data.errors.includes("Invalid auth token"))
      {
        throw new Error(`${data.errors}`);
      }else{
        throw new Error("Failed to get preferances");
      }
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error in fetching preferances:", error);
  }
};

export const SetPreferences = async (preferences: UserPreferances) => {
  try {
    console.log(preferences);
    const token: string | null = localStorage.getItem("authToken");
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ preferences: preferences }),
    });

    const data = await response.json();

    if (!response.ok) {
      if(data.errors.includes("Invalid auth token"))
      {
        throw new Error(`${data.errors}`);
      }else{
        throw new Error("Failed to set preferances");
      }
    } else {
      FetchPreferences();
    }
  } catch (error) {
    console.log("Error in set preferances:", error)
  }
};
