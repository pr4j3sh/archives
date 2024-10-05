import Delete from "./delete";
import SignIn from "./signin";
import SignUp from "./signup";
import Update from "./update";
import User from "./user";

export default function Crud() {
  return (
    <>
      <h1>CRUD operations</h1>
      <SignUp />
      <SignIn />
      <User />
      <Update />
      <Delete />
    </>
  );
}
