import React from "react";
import AuthForm from "../components/AuthForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../Contexts/SessionContext";
import { useContext } from "react";

export default function LoginPage() {
  const navigate = useNavigate();

  const { setToken, user, setUser, verifyToken, token } =
    useContext(SessionContext);

  const [userName, setUserName] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    console.log({ userName, email, passwordHash });
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, passwordHash }),
      });
      const parsed = await response.json();

      setToken(parsed.token);
      verifyToken(token);
      if (response.status === 200) {
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>Sign Up</div>
      <AuthForm
        userName={userName}
        setUserName={setUserName}
        passwordHash={passwordHash}
        setPasswordHash={setPasswordHash}
        email={email}
        setEmail={setEmail}
        onSubmit={handleSubmit}
        isLogin
      />
    </>
  );
}
