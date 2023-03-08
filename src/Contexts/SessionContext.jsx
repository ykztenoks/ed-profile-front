import { createContext } from "react";
import { useState, useEffect } from "react";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState();
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const verifyToken = async (jwt) => {
    const response = await fetch("http://localhost:8080/verify", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const parsed = await response.json();
    console.log("response from verify =>", response);
    if (response.status === 200) {
      console.log("response json bitch", parsed);
      setToken(jwt);
      setisAuthenticated(true);
      setUser(response.data);
      setIsLoading(false);
    } else {
      setToken(undefined);
      setUser(null);
      setisAuthenticated(false);
      setIsLoading(false);
    }
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
    <SessionContext.Provider
      value={{
        setToken,
        isAuthenticated,
        isLoading,
        user,
        setUser,
        verifyToken,
        token,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
export default SessionContextProvider;
