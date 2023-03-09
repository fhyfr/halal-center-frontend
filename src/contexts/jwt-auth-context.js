import React, { createContext, useEffect, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import SplashScreen from '../components/splash-screen';
import axios from '../utils/axios';

const { NEXT_PUBLIC_API } = process.env;

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (accessToken, accessTokenExpiresAt) => {
  if (!accessToken || !accessTokenExpiresAt) {
    return false;
  }

  const currentTime = new Date();
  const accessTokenExpire = new Date(accessTokenExpiresAt);

  return accessTokenExpire.getTime() > currentTime.getTime();
};

const setSession = (accessToken, accessTokenExpiresAt) => {
  if (accessToken && accessTokenExpiresAt) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('accessTokenExpiresAt', accessTokenExpiresAt);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExpiresAt');
    delete axios.defaults.headers.common.Authorization;
  }
};

export const getSession = () => {
  return localStorage.getItem('accessToken');
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case 'LOGIN': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case 'REGISTER': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const login = async (email, password) => {
    const response = await axios({
      method: 'POST',
      url: `${NEXT_PUBLIC_API}/auth/login`,
      data: { email, password },
    });
    const { accessToken, accessTokenExpiresAt } = response.data.data;

    setSession(accessToken, accessTokenExpiresAt);

    const user = await axios({
      method: 'GET',
      url: `${NEXT_PUBLIC_API}/user/current/self`,
    });

    dispatch({
      type: 'LOGIN',
      payload: {
        user: user.data,
      },
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (username, email, password, fullName) => {
    const response = await axios({
      method: 'POST',
      url: `${NEXT_PUBLIC_API}/auth/register`,
      data: { username, email, password, fullName },
    });
    const { data: user } = response.data;

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });

    return response.data.message;
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const accessTokenExpiresAt = window.localStorage.getItem('accessTokenExpiresAt');

        if (
          accessToken &&
          accessTokenExpiresAt &&
          isValidToken(accessToken, accessTokenExpiresAt)
        ) {
          setSession(accessToken, accessTokenExpiresAt);

          const response = await axios.get(`${NEXT_PUBLIC_API}/user/current/self`);
          const { data: user } = response;

          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: 'INITIALISE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialise();
  }, []);

  if (!state.isInitialised) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
