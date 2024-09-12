const btn = document.querySelector("button");

btn.addEventListener("click", () => {
  alert("You clicked the button");
});

console.log(moment().endOf("day").fromNow());
