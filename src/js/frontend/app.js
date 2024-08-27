async function fetchData() {
  const res = await fetch("https://cat-fact.herokuapp.com/facts");
  const data = await res.json();

  data.map((item) => {
    console.log(item.text);
  });
}

fetchData();
