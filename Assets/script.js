//_________________________________Global-Variables_______________________________________________
const buttonEl = document.querySelector(".btn");

//____________________________________local-Get_______________________________________________________________
function getLocal() {
    //get cityName from local storage and set it to list
    let cityList = JSON.parse(localStorage.getItem("cityName")) || [];
    const searchHistoryEl = document.querySelector(".search-history");

    //Clear previous list
    searchHistoryEl.innerHTML = "";

    //Add city to list using for each loop

    if (Array.isArray(cityList)) {
        // Add each city to the list
        cityList.forEach(function (cityName) {
          const cityListItem = document.createElement("li");
          cityListItem.textContent = cityName;
          searchHistoryEl.appendChild(cityListItem);
        });
      }
    }
    
    getLocal();
    




//________________________________Event-Listener__________________________________________________
// This function will hold the fetch requests for the weather data for current and future days.
buttonEl.addEventListener("click", function (event) {
    event.preventDefault();
    
//_________________________________Search-Results_________________________________________________
    const inputEl = document.querySelector(".form-control");
    const inputValue = inputEl.value.trim();

//_________________________________Current-Weather________________________________________________

    let apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputValue + "&appid=bea3f88e1674867f9dbf620b29744907";
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
                            currentCityEl.textContent = inputValue;
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
                            currentIconEl.setAttribute("src", "http://openweathermap.org/img/w/" + currentIcon + ".png");
                        });
                    }
                });
//_________________________________5-Day-Forecast________________________________________________
                // use lat and lon to get 5 day forecast for noon time each day in a for loop using the next 5 days
                let apiURL3 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=bea3f88e1674867f9dbf620b29744907";
                fetch(apiURL3).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            console.log(data);
                            for (let i = 0; i < 5; i++) {
                                const dayEl = document.querySelector(`.day${i + 1}`);
                                const tempEl = document.querySelector(`.day${i + 1}-temp`);
                                const humidityEl = document.querySelector(`.day${i + 1}-humidity`);
                                const iconEl = document.querySelector(`.icon-day${i + 1}`);
                              
                                const forecast = data.list[i];
                                const date = dayjs(currentDay).add(i + 1, 'day').format('MM/DD/YYYY');
                                const tempF = (forecast.main.temp - 273.15) * 1.8 + 32;
                                const humidity = forecast.main.humidity;
                                const icon = forecast.weather[0].icon;
                              
                                dayEl.textContent = date;
                                tempEl.textContent = `Temperature: ${tempF.toFixed(0)}°F`;
                                humidityEl.textContent = `Humidity: ${humidity}%`;
                                iconEl.setAttribute("src", `http://openweathermap.org/img/w/${icon}.png`);
                              }
 //____________________________________local-storage___________________________________________________________
                                //set cityName as an empty array
                                let cityName = { inputValue };
                                
                                //set cityName to local storage from the input value
                                localStorage.setItem("cityName", JSON.stringify(cityName));   
                                getLocal();     
                        });
                    }
                });
            });
        }
    });
});




//____________________________________simplified version___________________________________________________________


