export default function Card({ track }) {
  return (
    <article key={track?.id} className="card">
      <img src={track?.thumbnail} alt="" className="card-img" />
      <article className="card-body">
        <b>{track?.title}</b>
        <p>{track?.description}</p>
        <article className="btns">
          <img src={track?.author?.avatar} alt="" className="avatar" />
          <article>
            <p>{track?.author?.name}</p>
            <article className="btns">
              <p>
                {track?.length} | {track?.modulesCount}
              </p>
            </article>
          </article>
        </article>
      </article>
    </article>
  );
}
