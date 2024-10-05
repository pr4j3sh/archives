import { useEffect, useState } from "react";

const url = import.meta.env.VITE_API_URL;
const id = localStorage.getItem("id");

export default function User() {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (id) {
      const getUser = async () => {
        const res = await fetch(`${url}/api/auth/user/${id}`);
        const data = await res.json();
        console.log(data);
        setUser(data?.user);
      };
      getUser();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("id");
    setUser({});
  };

  return (
    <>
      <h3>User</h3>
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
