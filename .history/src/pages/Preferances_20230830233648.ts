import { API_ENDPOINT } from "../config/constants";
import { UserPreferances } from "../layout/account/Preferances";

interface Preferances {
  preferences : UserPreferances
}

export const FetchPreferences = async () => {
  try{
    const token: string | null = localStorage.getItem("authToken");
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
      throw new Error('Failed to get preferances');
    }
    const data: Preferances = await response.json();
    console.log(data);
    return data;
  }catch(error){
    console.log('Error fetching preferances:', error);
  }
    
};

export const SetPreferences = async (preferences : UserPreferances) => {
  console.log(preferences);

  const token: string | null = localStorage.getItem("authToken");
  const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ preferences : preferences}),
  });

  console.log(response);
  

  if (!response.ok) {
    throw new Error('Failed to set preferances');
  }else{
    FetchPreferences()
  }
};
