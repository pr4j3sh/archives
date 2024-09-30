import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/client";

export default function Update() {
  const values = {
    id: "",
    text: "",
  };
  const [formData, setFormData] = useState(values);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(formData);

      await updateDoc(doc(db, "texts", `${formData.id}`), {
        text: formData.text,
      });

      setFormData(values);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <>
      <h3>update</h3>
      <form onSubmit={handleSubmit} method="post">
        <input
          type="text"
          name="id"
          placeholder="text id"
          value={formData.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="text"
          placeholder="Write anything..."
          value={formData.text}
          onChange={handleChange}
        />
        <input type="submit" value="update" />
      </form>
    </>
  );
}
