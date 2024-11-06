import "./style.css";

const toggleButton = document.getElementById("theme-toggle");

const currentTheme = localStorage.getItem("theme");

const prefersDarkScheme = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches;

if (currentTheme === "dark") {
  document.documentElement.classList.add("dark");
} else if (currentTheme === "light") {
  document.documentElement.classList.remove("dark");
} else if (prefersDarkScheme) {
  document.documentElement.classList.add("dark");
}

toggleButton.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  });
