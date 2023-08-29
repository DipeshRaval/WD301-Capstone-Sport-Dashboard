import { API_ENDPOINT } from '../../config/constants';

export const fetchNews = async (dispatch: any) => {
  try {
    dispatch({ type: "FETCH_NEWS_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/articles`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
    });
    const data = await response.json();
    dispatch({ type: "FETCH_NEWS_SUCCESS", payload: data });
  } catch (error) {
    console.log('Error fetching matches:', error);
    dispatch({ type: "FETCH_NEWS_FAILURE", payload: 'Unable to load news articles' });
  }
};
