import Create from "./create";
import Delete from "./delete";
import Read from "./read";
import Update from "./update";

export default function Crud() {
  return (
    <>
      <h1>CRUD operations</h1>
      <Create />
      <Read />
      <Update />
      <Delete />
    </>
  );
}
