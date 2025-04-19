import Cards from "../components/cards";
import { useQuery, gql } from "@apollo/client";
import { TRACKS } from "../lib/query";

export default function Home() {
  const { loading, error, data } = useQuery(TRACKS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data);
  return (
    <section>
      <article>
        <p className="font-semibold">Hey there,</p>
        <p>This is catstronaut.</p>
      </article>
      <Cards tracks={data?.tracksForHome} />
    </section>
  );
}
