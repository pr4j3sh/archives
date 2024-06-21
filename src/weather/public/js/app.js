let loc = "london";
const API_KEY = "45b11607ce8aa9c3a54c0a355e420441";

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

async function getWeather(key, loc) {
  try {
    const coord = await getLocation(key, loc);
    const lat = coord.lat;
    const lon = coord.lon;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

getWeather(API_KEY, loc);
