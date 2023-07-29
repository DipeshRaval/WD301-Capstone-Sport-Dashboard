export interface Sport {
  id : number;
  name : string;
}

export interface SportState {
  sports: Sport[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export const initialState: SportState = {
  sports: [],
  isLoading: false,
  isError: false,
  errorMessage: ''
};

export type SportActions =
  | { type: 'FETCH_SPORT_REQUEST' }
  | { type: 'FETCH_SPORT_SUCCESS'; payload: Sport[] }
  | { type: 'FETCH_SPORT_FAILURE'; payload: string }

export const reducer = (state:  SportState = initialState, action: SportActions): SportState => {
  switch (action.type) {
    case "FETCH_SPORT_REQUEST":
      return {
        ...state,
        isLoading: true
      };
    case "FETCH_SPORT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        sports: action.payload,
      };
    case "FETCH_SPORT_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload
      };
    default:
      return state;
  }
}
