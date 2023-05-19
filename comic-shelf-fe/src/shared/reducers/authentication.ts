import axios from 'axios';

import {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'src/shared/reducers/action-type.util';
import { IUser, defaultValue as defaultUser } from 'src/shared/model/user.model';
import { strapiUrl } from './api-urls';
import { AUTH_TOKEN_KEY } from 'src/config/constans';

export const ACTION_TYPES = {
  LOGIN: 'authentication/LOGIN',
  LOGOUT: 'authentication/LOGOUT',
  REGISTER: 'authentication/REGISTER',
  GET_USER_INFORMATION: 'authentication/USER',
  RESET_MESSAGES: 'authentication/RESET_MESSAGES',
  UPDATE_USER: 'authentication/UPDATE_USER',
  RESET_UPDATE: 'authentication/RESET_UPDATE',
  ERROR_MESSAGE: 'authentication/ERROR_MESSAGE',
};

const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  errorMessage: '', // Errors returned from server side
  redirectMessage: '',
  idToken: '',
  logoutUrl: '',
  user: defaultUser,
  updateSuccess: false
};

export type AuthenticationState = Readonly<typeof initialState>;

// Reducer

export default (
  state: AuthenticationState = initialState,
  action
): AuthenticationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: true,
        loginError: false,
        loginSuccess: false,
      };
    case FAILURE(ACTION_TYPES.LOGIN):
      return {
        ...initialState,
        loading: false,
        errorMessage: action.payload,
        loginError: true,
      };
    case SUCCESS(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: false,
        loginError: false,
        loginSuccess: true,
        user: { ...action.payload.data.user, comics: action.payload.data.user.comics },
        idToken: action.payload.data.jwt,
        isAuthenticated: true,
      };
    case REQUEST(ACTION_TYPES.REGISTER):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.REGISTER):
      return {
        ...initialState,
        loading: false,
        errorMessage: action.payload,
        loginError: true,
      };
    case SUCCESS(ACTION_TYPES.REGISTER):
      return {
        ...state,
        loading: false,
        loginError: false,
        loginSuccess: true,
        user: action.payload.data.user,
        idToken: action.payload.data.jwt,
        isAuthenticated: true,
      };
    case REQUEST(ACTION_TYPES.GET_USER_INFORMATION):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GET_USER_INFORMATION):
      return {
        ...initialState,
        loading: false,
        errorMessage: action.payload,
        isAuthenticated: false,
      };
    case SUCCESS(ACTION_TYPES.GET_USER_INFORMATION):
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.data,
      };
    case REQUEST(ACTION_TYPES.UPDATE_USER):
      return {
        ...state,
        loading: true,
        updateSuccess: false
      };
    case FAILURE(ACTION_TYPES.UPDATE_USER):
      return {
        ...initialState,
        loading: false,
        errorMessage: action.payload,
        updateSuccess: false
      };
    case SUCCESS(ACTION_TYPES.UPDATE_USER):
      return {
        ...state,
        loading: false,
        updateSuccess: true,
        user: action.payload.data,
      };
    case ACTION_TYPES.RESET_UPDATE:
      return {
        ...state,
        updateSuccess: false
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
      };
    case ACTION_TYPES.RESET_MESSAGES:
      return {
        ...state,
        errorMessage: '',
        loginError: false,
        loginSuccess: false,
      }
    case ACTION_TYPES.ERROR_MESSAGE:
      return {
        ...initialState,
        redirectMessage: action.message,
      };
    default:
      return state;
  }
};

export const login = (identifier, password) => {
  const result = {
    type: ACTION_TYPES.LOGIN,
    payload: axios.post(`${strapiUrl}auth/local`, { identifier, password }),
  };

  return result;
};

export const loginProvider = (provider, search) => ({
  type: ACTION_TYPES.LOGIN,
  payload: axios.get(`${strapiUrl}auth/${provider}/callback${search}`),
});

export const register = (username, password, email) => {
  const result = {
    type: ACTION_TYPES.REGISTER,
    payload: axios.post(`${strapiUrl}auth/local/register`, {
      username,
      password,
      email,
    }),
  };

  return result;
};

export const getMe = () => {
  const token =
    localStorage.getItem(AUTH_TOKEN_KEY) ||
    sessionStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) {
    return {
      type: ACTION_TYPES.GET_USER_INFORMATION,
      payload: 'Not authenticated!',
    };
  } else {
    return {
      type: ACTION_TYPES.GET_USER_INFORMATION,
      payload: axios.get(`${strapiUrl}users/me`),
    };
  }
};

export const updateUser = (user: IUser) => ({
  type: ACTION_TYPES.UPDATE_USER,
  payload: axios.put<IUser>(`${strapiUrl}users/${user.id}`, user)
});

export const clearAuthToken = () => {
  if (localStorage.getItem(AUTH_TOKEN_KEY)) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
  if (sessionStorage.getItem(AUTH_TOKEN_KEY)) {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

export const resetUpdate = () => ({
  type: ACTION_TYPES.RESET_UPDATE,
});

export const resetMessages = () => ({
  type: ACTION_TYPES.RESET_MESSAGES,
})

export const logout = () => {
  clearAuthToken();
  return ({
    type: ACTION_TYPES.LOGOUT,
  });
};
