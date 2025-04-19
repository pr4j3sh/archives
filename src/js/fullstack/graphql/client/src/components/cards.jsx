import Card from "./card";

export default function Cards({ tracks }) {
  return (
    <section>
      {tracks && tracks.map((track) => <Card key={track?.id} track={track} />)}
    </section>
  );
}
