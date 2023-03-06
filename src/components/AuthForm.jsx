import React from "react";

export default function AuthForm ({
  userName,
  passwordHash,
  email,
  setUserName,
  setPasswordHash,
  setEmail,
  onSubmit,
  isLogin = false,
}) {
  const submitCallback = (event) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Username
        <input
          type="text"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={passwordHash}
          onChange={(event) => setPasswordHash(event.target.value)}
        />
      </label>
      <button type="submit">{isLogin ? "Login" : "Submit"}</button>
    </form>
  );
}
