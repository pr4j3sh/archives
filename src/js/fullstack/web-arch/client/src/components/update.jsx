import { useEffect, useState } from "react";

const url = import.meta.env.VITE_API_URL;
const id = localStorage.getItem("id");

export default function Update() {
  const values = {
    id: "",
    name: "",
    password: "",
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
    console.log(formData);
    try {
      const res = await fetch(`${url}/api/auth/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      console.log(data);
      setFormData(values);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h3>Update</h3>
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
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Your password"
          value={formData.password}
          onChange={handleChange}
        />
        <input type="submit" value="Update" />
      </form>
    </>
  );
}
