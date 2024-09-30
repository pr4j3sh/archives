import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/client";

export default function Delete() {
  const values = {
    id: "",
  };
  const [formData, setFormData] = useState(values);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(formData);

      await deleteDoc(doc(db, "texts", `${formData.id}`));

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
      <h3>delete</h3>
      <form onSubmit={handleSubmit} method="post">
        <input
          type="text"
          name="id"
          placeholder="text id"
          value={formData.id}
          onChange={handleChange}
        />
        <input type="submit" value="delete" />
      </form>
    </>
  );
}
