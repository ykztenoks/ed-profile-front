import { createContext } from "react";
import { useState, useEffect } from "react";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState();
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setUser]= useState("")
    const verifyToken = async (jwt) => {
    const response = await fetch("http://localhost:5005/verify", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.status === 200) {
      console.log(response.data)
      setToken(jwt);
      setUser(jwt)
      console.log(token);
      setisAuthenticated(true);
    } else {
      setToken(undefined);
      setisAuthenticated(false);
    }
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
      verifyToken(token);
    }
  }, [token]);

  return (
    <SessionContext.Provider value={{ setToken, isAuthenticated, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};
export default SessionContextProvider;
