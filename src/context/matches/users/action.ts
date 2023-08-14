import { API_ENDPOINT } from '../../../config/constants';

export const fetchUserPreferences = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: "FETCH_USER_PREFERENCES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch({ type: "FETCH_USER_PREFERENCES_SUCCESS", payload: data });
  } catch (error) {
    console.log('Error fetching user preferences:', error);
    dispatch({ type: "FETCH_USER_PREFERENCES_FAILURE", payload: 'Unable to load user preferences' });
  }
};

export const setUserPreferences = async (dispatch: any, args:any) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
      body: JSON.stringify(args),
    });
    if (!response.ok) {
      throw new Error('Failed to set user preferences');
    }
    const data = await response.json();
    dispatch({ type: "SET_USER_PREFERENCES_SUCCESS", payload: data });
  } catch (error) {
    console.log('Error in set user preferences:', error);
  }
};
