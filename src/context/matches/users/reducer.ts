export interface UserState {
  preferences: object;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export const initialState: UserState = {
  preferences: {},
  isLoading: false,
  isError: false,
  errorMessage: ''
};

export type UserActions =
  | { type: 'FETCH_USER_PREFERENCES_REQUEST' }
  | { type: 'FETCH_USER_PREFERENCES_SUCCESS'; payload: object }
  | { type: 'FETCH_USER_PREFERENCES_FAILURE'; payload: string }
  | { type: 'SET_USER_PREFERENCES_REQUEST' }
  | { type: 'SET_USER_PREFERENCES_SUCCESS'; payload: object }
  | { type: 'SET_USER_PREFERENCES_FAILURE'; payload: string }

export const reducer = (state:  UserState = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case "FETCH_USER_PREFERENCES_REQUEST":
      return {
        ...state,
        isLoading: true
      };
    case "FETCH_USER_PREFERENCES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        preferences: action.payload,
      };
    case "FETCH_USER_PREFERENCES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload
      };
    case "SET_USER_PREFERENCES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        preferences: action.payload,
      };
    default:
      return state;
  }
}
