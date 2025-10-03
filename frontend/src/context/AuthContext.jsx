import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuth: true,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "ADMIN_LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("role", JSON.stringify(action.payload.role));
      return {
        ...state,
        isAuth: true,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuth: false,
        user: null,
        token: null,
        role: null,
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    isAuth: false,
    user: null,
    role: null,
    token: null,
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (user && token && role) {
        dispatch({
            type: "ADMIN_LOGIN",
            payload: { user: JSON.parse(user), token: JSON.parse(token), role: JSON.parse(role) },
          });
    }
    else if (user && token) {
      dispatch({
        type: "LOGIN",
        payload: { user: JSON.parse(user), token: JSON.parse(token) },
      });
    }
  }, []);
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
