import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/client";

export default function Create() {
  const values = {
    text: "",
  };
  const [formData, setFormData] = useState(values);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(formData);

      await addDoc(collection(db, "texts"), formData);

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
      <h3>create</h3>
      <form onSubmit={handleSubmit} method="post">
        <input
          type="text"
          name="text"
          placeholder="Write anything..."
          value={formData.text}
          onChange={handleChange}
        />
        <input type="submit" value="create" />
      </form>
    </>
  );
}
