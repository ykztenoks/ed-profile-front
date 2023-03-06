import { createContext } from "react";
import { useState, useEffect } from "react";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState();

const verifyToken = async jwt => {
    const response = await fetch("http://localhost:5005/verify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    const parsed = await response.json()
    console.log(parsed)
    setToken(jwt)
  };

  useEffect(() => {
    const localToken = window.localStorage.getItem("authToken");
    verifyToken(localToken)
  }, []);

  useEffect(() => {
    console.log(token);
    if (token) {
      window.localStorage.setItem("authToken", token);
    }
  }, [token]);

  return (
    <SessionContext.Provider value={{ token, setToken }}>
      {children}
    </SessionContext.Provider>
  );
};
export default SessionContextProvider;
