//_________________________________Global-Variables_______________________________________________
const buttonEl = document.querySelector(".btn");
//Call getLocal on load.
getSearchHistory();


//________________________________Event-Listener__________________________________________________
// This function will hold the fetch requests for the weather data for current and future days.
buttonEl.addEventListener("click", function (event) {
    event.preventDefault();

//_________________________________Search-Results_________________________________________________
    const inputEl = document.querySelector(".form-control");
    const cityName = inputEl.value.trim();
//_________________________________Local-Storage__________________________________________________
    const cityArray = JSON.parse(localStorage.getItem("cityName")) || [];
    cityArray.push(cityName); //Saying not a function. Unsure what to do here. Will ask for assistance in the matter as I cannot find solution or resources to help me.
    localStorage.setItem("cityName", JSON.stringify(cityArray)); 
    //Call getLocal
    getSearchHistory();

//_________________________________Current-Weather________________________________________________

    const apiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=bea3f88e1674867f9dbf620b29744907";
    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                // pull lat and lon from data
                const lat = data[0].lat;
                const lon = data[0].lon;
                // use lat and lon to get weather data
                let apiURL2 = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=bea3f88e1674867f9dbf620b29744907";
                fetch(apiURL2).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            console.log(data);

                            // pull current weather data
                            let currentTemp = data.main.temp;
                            let currentHumidity = data.main.humidity;
                            let currentWind = data.wind.speed;

                            //add data to current weather div
                            const currentTempEl = document.querySelector(".current-temp");
                            currentTempEl.textContent = ": " + currentTemp;
                            const currentHumidityEl = document.querySelector(".current-humidity");
                            currentHumidityEl.textContent = "Humidity: " + currentHumidity + "%";
                            const currentWindEl = document.querySelector(".current-wind");
                            currentWindEl.textContent = "Wind Speed: " + currentWind + " MPH";

                            //show name of city in current weather div
                            const currentCityEl = document.querySelector(".current-city");
                            currentCityEl.textContent = cityName;

                            //get date and add to current weather div using dayjs
                            const currentDateEl = document.querySelector(".current-date");
                            currentDateEl.textContent = dayjs().format('MM/DD/YYYY');

                            // turn temp data from kelvin to farenheit
                            let currentTempF = (currentTemp - 273.15) * 1.80 + 32;

                            // add temp data to current weather div
                            currentTempEl.textContent = "Temperature: " + currentTempF.toFixed(0) + "°F";
                            
                            // get icon data and add to icon-current div
                            let currentIcon = data.weather[0].icon;
                            const currentIconEl = document.querySelector(".icon-current");
                            currentIconEl.setAttribute("src", "https://openweathermap.org/img/w/" + currentIcon + ".png");
                        });
                    }
                });
//_________________________________5-Day-Forecast________________________________________________
                // use lat and lon to get 5 day forecast
                let apiURL3 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=bea3f88e1674867f9dbf620b29744907";
                fetch(apiURL3).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            console.log(data);
                            const currentDate = new Date();
                            let forecastCount = 0;

                            // Loop through the forecast data and update the corresponding elements
                            for (let i = 0; i < data.list.length; i++) {
                                const forecast = data.list[i];
                                const forecastDate = new Date(forecast.dt_txt);

                                // Check if the forecast date is greater than the current date
                                if (forecastDate.getDate() > currentDate.getDate()) {
                                    const dayEl = document.querySelector(`.day${forecastCount + 1}`);
                                    const tempEl = document.querySelector(`.day${forecastCount + 1}-temp`);
                                    const humidityEl = document.querySelector(`.day${forecastCount + 1}-humidity`);
                                    const iconEl = document.querySelector(`.icon-day${forecastCount + 1}`);
                                    const windEl = document.querySelector(`.day${forecastCount + 1}-wind`);
                                    // changes kelvin to farenheit
                                    const date = dayjs(forecastDate).format('MM/DD/YYYY');
                                    const tempF = (forecast.main.temp - 273.15) * 1.8 + 32;
                                    const humidity = forecast.main.humidity;
                                    const icon = forecast.weather[0].icon;
                                    //updates the elements text content and icon
                                    dayEl.textContent = date;
                                    tempEl.textContent = `Temperature: ${tempF.toFixed(0)}°F`;
                                    humidityEl.textContent = `Humidity: ${humidity}%`;
                                    windEl.textContent = `Wind Speed: ${forecast.wind.speed} MPH`;
                                    iconEl.setAttribute("src", `http://openweathermap.org/img/w/${icon}.png`);

                                    forecastCount++;
                                    // Break out of the loop if we have 5 days of forecast data
                                    if (forecastCount === 5) {
                                        break;
                                    }
                                }
                            }
                        });
                    }
                });
            });
        }
    });
});

//_________________________________Search-History_________________________________________________
//This function will get the search history from local storage and display it on the page as a list
function getSearchHistory() {
    let cityArray = JSON.parse(localStorage.getItem("cityName")) || [];
    const searchHistoryEl = document.querySelector(".search-history");
    searchHistoryEl.innerHTML = "";
    for (let i = 0; i < cityArray.length; i++) {
        const city = cityArray[i];
        // Create a new button element that when clicked will search for the city
        const cityEl = document.createElement("button");
        cityEl.addEventListener("click", function () {
            const inputEl = document.querySelector(".form-control");
            inputEl.value = city;
            inputEl.dispatchEvent(new Event("change"));
        });
        cityEl.textContent = city;
        cityEl.classList.add("list-group-item");
        searchHistoryEl.appendChild(cityEl);
        //remove any repeated cities
        cityArray = cityArray.filter(function (item, pos) {
            return cityArray.indexOf(item) == pos;
        }
        );
    }
}
