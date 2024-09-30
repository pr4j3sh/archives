import { Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <h1>Features</h1>
      <ul>
        <li>
          <Link to="/auth">auth</Link>
        </li>
        <li>
          <Link to="/data">data</Link>
        </li>
      </ul>
    </>
  );
}
