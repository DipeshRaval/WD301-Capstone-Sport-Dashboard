import { API_ENDPOINT } from '../../config/constants';

export const fetchMatches = async (dispatch: any) => {
  try {
    dispatch({ type: "FETCH_MATCHES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
    });
    const data = await response.json();
    dispatch({ type: "FETCH_MATCHES_SUCCESS", payload: data.matches });
  } catch (error) {
    console.log('Error fetching matches:', error);
    dispatch({ type: "FETCH_MATCHES_FAILURE", payload: 'Unable to load matches' });
  }
};
