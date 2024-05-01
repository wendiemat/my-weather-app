// get time and date
function time(hour, minute) {
  let currentDate = document.querySelector(".date");
  let currentTime = document.querySelector(".current-day");
  let now = new Date();
  let date = now.getDate();
  let month = now.getMonth();
  let year = now.getFullYear();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes().toLocaleString();

  if (hours < 12) {
    currentDate.innerHTML = `${date}/${month + 1}/${year}`;
    currentTime.innerHTML = `${day}, ${hours}:${minutes} AM`;
  } else {
    currentDate.innerHTML = `${date}/${month + 1}/${year}`;
    currentTime.innerHTML = `${day}, ${hours}:${minutes} PM`;
  }
}

// capitalize the first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// update city name to user input in search bar
let formInput = document.querySelector("#form-input");

function search(event) {
  // get current weather for city according to user input
  let apiKey = `bebdb91759t6f0a32a7b0d2b4b280oc5`;
  let city = `${formInput.value}`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  function dispCurrentTemp(response) {
    let currentTemp = Math.round(response.data.temperature.current);
    let temperatureElement = document.querySelector("#temp-degree");
    temperatureElement.innerHTML = `${currentTemp}°C `;

    // metric conversion functions
    function celsiusToFahrenheit(celsius) {
      event.preventDefault();
      const fahrenheit = (currentTemp * 9) / 5 + 32;
      return fahrenheit;
    }
    let clickF = document.querySelector(".fahrenheit");
    clickF.addEventListener("click", celsiusToFahrenheit);

    let clickC = document.querySelector(".celsius");
    clickC.addEventListener("click", dispCurrentTemp);
  }

  event.preventDefault();
  let h3 = document.querySelector("#display-city");
  h3.innerHTML = `${capitalizeFirstLetter(formInput.value)}`;

  time();
  axios.get(apiUrl).then(dispCurrentTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
