import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../Contexts/SessionContext";
import axios from "axios";
export default function ProfilePage() {
  const { user, token } = useContext(SessionContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get("http://127.0.0.1:8080/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        setProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile();
  }, [token]);
  return profile ? (
    <>
      <h1>{profile.userName}</h1>
      <p>{profile.email}</p>
    </>
  ) : (
    <>
      <p>no user was found</p>
    </>
  );
}
