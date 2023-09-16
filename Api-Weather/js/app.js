const apiKey = "0716f7543779b0a3127485e01a732ff0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".pesquisa input");
const searchBtn = document.querySelector(".pesquisa .btn-pesquisa");
const filtroBtn = document.querySelector(".organizador .btn-filtro");
const Icones = document.querySelector(".weather-icon");

let celsius = true;

let tempOriginal;

async function checkWeather(city) {
  const unit = celsius ? 'metric' : 'imperial';
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=${unit}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".title-btn").style.display = "none";
    document.querySelector(".btn-filtro").style.display = "none";
  } else {
    var data = await response.json();

    tempOriginal = data.main.temp;

    document.querySelector(".cidade").innerHTML = data.name;
    document.querySelector(".tempo").innerHTML = Math.round(data.main.temp) + (celsius ? "°C" : "°F");
    document.querySelector(".p-umidade").innerHTML = data.main.humidity + "%";
    document.querySelector(".p-ventania").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      Icones.src = "img/nublado.png";
    } else if (data.weather[0].main == "Clear") {
      Icones.src = "img/sol-n.png";
    } else if (data.weather[0].main == "Rain") {
      Icones.src = "img/chuva.png";
    } else if (data.weather[0].main == "Drizzle") {
      Icones.src = "img/chuva-sol.png";
    } else if (data.weather[0].main == "Mist") {
      Icones.src = "img/sol-nuvem.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".title-btn").style.display = "block";
    document.querySelector(".btn-filtro").style.display = "block";
  }
}

searchBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkWeather(searchBox.value);
  }
});

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});

filtroBtn.addEventListener('click', () => {
  if (celsius) {
    celsius = false;
    const tempCelsius = parseFloat(tempOriginal);
    const tempFahrenheit = (tempCelsius * 9/5) + 32;
    document.querySelector(".tempo").innerHTML = Math.round(tempFahrenheit) + "°F";
  } else if (!celsius && document.querySelector(".tempo").innerHTML.includes("°F")) {
    celsius = false;
    const tempCelsius = parseFloat(tempOriginal);
    const tempKelvin = tempCelsius + 273.15;
    document.querySelector(".tempo").innerHTML = Math.round(tempKelvin) + "K";
  } else {
    celsius = true;
    checkWeather(searchBox.value);
  }
});


