function formatDate(timestamp){
    let date = new Date(timestamp)
    let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}`;
  }
    let mins = date.getMinutes();
    if (mins < 10) {
    mins = `0${minutes}`;
  }
    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
    let day = days[date.getDay()];
    return`${day} ${hours}:${mins}`;

}

function displayTemperarture(response){
    let temp = document.querySelector("#temp");
    let city = document.querySelector("#city");
    let description = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let date = document.querySelector("#date");
    let icon = document.querySelector("#icon");

    temp.innerHTML = Math.round(response.data.main.temp);
    city.innerHTML = response.data.name;
    description.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);
    date.innerHTML = formatDate(response.data.dt * 1000);
    icon.setAttribute("src",
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
    icon.setAttribute("alt",response.data.weather[0].description);

}
function search(city){
    let apiKey = "6f1ef73058d115e56afccee279259142";
    let apiUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperarture)
}
function processData(event){
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit",processData);

