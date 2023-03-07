import { createContext } from "react";
import { useState, useEffect } from "react";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState();
  const [isAuthenticated, setisAuthenticated] = useState(false)

  const verifyToken = async (jwt) => {
    const response = await fetch("http://localhost:5005/verify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setToken(jwt);
    setisAuthenticated(true)
    setIsLoading(false);
  };

  useEffect(() => {
    const localToken = window.localStorage.getItem("authToken");
    verifyToken(localToken);
  }, []);

  useEffect(() => {
    console.log(token);
    if (token) {
      window.localStorage.setItem("authToken", token);
      if (!isAuthenticated) {
      setisAuthenticated(true)
      }
    }
  }, [token]);

  return (
    <SessionContext.Provider value={{ setToken, isAuthenticated, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};
export default SessionContextProvider;
