import { useEffect, useState } from "react";

const url = import.meta.env.VITE_API_URL;
const id = localStorage.getItem("id");

export default function Delete() {
  const values = {
    id: "",
  };
  const [formData, setFormData] = useState(values);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (id) {
      setFormData({ ...formData, id });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${url}/api/auth/user/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      console.log(data);
      localStorage.removeItem("id");
      setFormData(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h3>Delete</h3>
      <form method="post" onSubmit={handleSubmit}>
        <input
          type="id"
          name="id"
          placeholder="Your Id"
          disabled
          required
          value={formData.id}
          onChange={handleChange}
        />
        <input type="submit" value="Delete" />
      </form>
    </>
  );
}
