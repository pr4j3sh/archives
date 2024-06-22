let temp = document.getElementById("temp");
let feelsLike = document.getElementById("feels-like");
let maxTemp = document.getElementById("max-temp");
let minTemp = document.getElementById("min-temp");
let place = document.getElementById("place");
let latitude = document.getElementById("latitude");
let longitude = document.getElementById("longitude");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let description = document.getElementById("description");
let windSpeed = document.getElementById("wind-speed");

document.addEventListener("keypress", (event) => {
  if (event.key === "/") {
    event.preventDefault();
    document.getElementById("locationInput").focus();
  }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.getElementById('locationInput').blur();
    }
});

async function getLocation(key, loc) {
  try {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=5&appid=${key}`;
    const res = await fetch(url);
    const data = await res.json();
    const coord = {
      lat: data[0].lat,
      lon: data[0].lon,
    };
    return coord;
  } catch (error) {
    console.log(error.message);
  }
}

async function getWeather(event) {
  if (event) event.preventDefault();
  const loc = document.placeForm.loc.value || "london";
  const key = "45b11607ce8aa9c3a54c0a355e420441";

  try {
    const coord = await getLocation(key, loc);
    const lat = coord.lat;
    const lon = coord.lon;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    temp.innerHTML = data.main.temp;
    temp.classList.remove("placeholder")
    feelsLike.innerHTML = data.main.feels_like;
    feelsLike.classList.remove("placeholder")
    maxTemp.innerHTML = data.main.temp_max;
    maxTemp.classList.remove("placeholder")
    minTemp.innerHTML = data.main.temp_min;
    minTemp.classList.remove("placeholder")
    place.innerHTML = data.name;
    place.classList.remove("placeholder")
    latitude.innerHTML = data.coord.lat;
    latitude.classList.remove("placeholder")
    longitude.innerHTML = data.coord.lon;
    longitude.classList.remove("placeholder")
    humidity.innerHTML = data.main.humidity;
    humidity.classList.remove("placeholder")
    pressure.innerHTML = data.main.pressure;
    pressure.classList.remove("placeholder")
    description.innerHTML = data.weather[0].description;
    description.classList.remove("placeholder")
    windSpeed.innerHTML = data.wind.speed;
    windSpeed.classList.remove("placeholder")
    document.getElementById("locationInput").value = "";
  } catch (error) {
    document.getElementById("locationInput").value = "";
    alert(error.message);
    console.log(error.message);
  }
}

getWeather();
