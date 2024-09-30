import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Data() {
  const tasks = useQuery(api.tasks.get);
  return (
    <div className="App">
      {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
    </div>
  );
}
