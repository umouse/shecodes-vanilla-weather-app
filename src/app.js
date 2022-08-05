function getCurrentLocation() {
navigator.geolocation.getCurrentPosition(initialSearch);

};

function changeBackground(weatherDescription){

    if (weatherDescription==="clear sky"
        || weatherDescription==="thunderstorm"
        || weatherDescription==="snow"
        || weatherDescription==="mist"
        || weatherDescription==="broken clouds"
        ){
        document.body.background = `src/media/${weatherDescription}.jpg`;
    } else if (
        weatherDescription === "few clouds" || weatherDescription === "scattered clouds"){
        document.body.background = `src/media/clouds.jpg`;
    } else if (
        weatherDescription==="rain" || weatherDescription === "shower rain" || weatherDescription === "light rain"){
        document.body.background = `src/media/rain.jpg`;
    } else {
        document.body.background =`src/media/clouds.jpg`
    }
   
}

function formatDate(timestamp){
    let date = new Date(timestamp)
    let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}`;
  } 
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
    return`${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay()
    let daysShort=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return daysShort[day]


}

function displayForecast(response){
    let forecastResponse = response.data.daily;
    let forecast = document.querySelector("#forecast");
    let forecastHTML= `<div class="row">`;

    forecastResponse.forEach(function (forecastDay,index) {
        if (index < 6){
        forecastHTML = forecastHTML +
        `
        <div class="col-2">
            <div class="wf-date">
              ${formatDay(forecastDay.dt)}
            </div>  
            <img 
            src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
            alt="${forecastDay.weather[0].description}"
            width="40px"
            
            <span class="wf-temp-max">
              ${Math.round(forecastDay.temp.max)}°
            </span>
            <span class="wf-temp-min">
              ${Math.round(forecastDay.temp.min)}°
            </span>
          </div>
          `;
        }  
    });

    forecastHTML = forecastHTML +`</div>`;
    forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates){
    let apiKey = "6f1ef73058d115e56afccee279259142";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast)

}

function displayTemperarture(response){
    let overview = document.querySelector(".overview")
    let metrics = document.querySelector(".metrics");
    let temp = document.querySelector("#temp");
    let city = document.querySelector("#city");
    let description = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let date = document.querySelector("#date");
    let icon = document.querySelector("#icon");


    
    tempC = response.data.main.temp
    temp.innerHTML = Math.round(tempC);
    city.innerHTML = response.data.name;
    description.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);
    date.innerHTML = formatDate(response.data.dt * 1000);
    icon.setAttribute("src",
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
    icon.setAttribute("alt",response.data.weather[0].description);
    overview.style.visibility = "visible";
    metrics.style.visibility = "visible";

    changeBackground(response.data.weather[0].description);
    getForecast(response.data.coord);

}

function initialSearch(position){
    let apiKey = "6f1ef73058d115e56afccee279259142";
    let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperarture);
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
function displayTempF(event){
    event.preventDefault();
    celsius.classList.remove("active");
    fahrenheit.classList.add("active");
    let tempF =(tempC*9)/5+32;
    let temp = document.querySelector("#temp");
    temp.innerHTML = Math.round(tempF); 
}

function displayTempC(event){
    event.preventDefault();
    fahrenheit.classList.remove("active");
    celsius.classList.add("active");
    let temp = document.querySelector("#temp");
    temp.innerHTML = Math.round(tempC); 

}
let tempC = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit",processData);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click",displayTempF);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click",displayTempC);

getCurrentLocation()
