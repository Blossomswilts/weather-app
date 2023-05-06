//_________________________________Global-Variables_______________________________________________
const buttonEl = document.querySelector(".btn");

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
                            currentTempEl.textContent = "Temperature: " + currentTempF.toFixed(2) + "°F";
                            // get icon data and add to icon-current div
                            let currentIcon = data.weather[0].icon;
                            const currentIconEl = document.querySelector(".icon-current");
                            currentIconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + currentIcon + ".png");
                        });
                    }
                });
//_________________________________5-Day-Forecast________________________________________________
                // use lat and lon to get 5 day forecast for noon time each day in a for loop using th4e next 5 days
                let apiURL3 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=bea3f88e1674867f9dbf620b29744907";
                fetch(apiURL3).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            console.log(data);
                            // pull 5 day forecast data and set it to the 5 divs in the next-days div using a ternerary operator
                            const day1El = document.querySelector(".day1");
                            day1El.textContent = dayjs().add(1, 'day').format('MM/DD/YYYY');
                            const day1TempEl = document.querySelector(".day1-temp");
                            day1TempEl.textContent = data.list[0].main.temp;
                            const day1HumidityEl = document.querySelector(".day1-humidity");
                            day1HumidityEl.textContent = "Humidity: " + data.list[0].main.humidity + "%";
                            const day2El = document.querySelector(".day2");
                            day2El.textContent = dayjs().add(2, 'day').format('MM/DD/YYYY');
                            const day2TempEl = document.querySelector(".day2-temp");
                            day2TempEl.textContent = data.list[1].main.temp;
                            const day2HumidityEl = document.querySelector(".day2-humidity");
                            day2HumidityEl.textContent = "Humidity: " + data.list[1].main.humidity + "%";
                            const day3El = document.querySelector(".day3");
                            day3El.textContent = dayjs().add(3, 'day').format('MM/DD/YYYY');
                            const day3TempEl = document.querySelector(".day3-temp");
                            day3TempEl.textContent = data.list[2].main.temp;
                            const day3HumidityEl = document.querySelector(".day3-humidity");
                            day3HumidityEl.textContent = "Humidity: " + data.list[2].main.humidity + "%";
                            const day4El = document.querySelector(".day4");
                            day4El.textContent = dayjs().add(4, 'day').format('MM/DD/YYYY');
                            const day4TempEl = document.querySelector(".day4-temp");
                            day4TempEl.textContent = data.list[3].main.temp;
                            const day4HumidityEl = document.querySelector(".day4-humidity");
                            day4HumidityEl.textContent = "Humidity: " + data.list[3].main.humidity + "%";
                            const day5El = document.querySelector(".day5");
                            day5El.textContent = dayjs().add(5, 'day').format('MM/DD/YYYY');
                            const day5TempEl = document.querySelector(".day5-temp");
                            day5TempEl.textContent = data.list[4].main.temp;
                            const day5HumidityEl = document.querySelector(".day5-humidity");
                            day5HumidityEl.textContent = "Humidity: " + data.list[4].main.humidity + "%";

                            // turn all the temp data from kelvin to farenheit
                            let day1Temp = data.list[0].main.temp;
                            let day1TempF = (day1Temp - 273.15) * 1.80 + 32;
                            let day2Temp = data.list[1].main.temp;
                            let day2TempF = (day2Temp - 273.15) * 1.80 + 32;
                            let day3Temp = data.list[2].main.temp;
                            let day3TempF = (day3Temp - 273.15) * 1.80 + 32;
                            let day4Temp = data.list[3].main.temp;
                            let day4TempF = (day4Temp - 273.15) * 1.80 + 32;
                            let day5Temp = data.list[4].main.temp;
                            let day5TempF = (day5Temp - 273.15) * 1.80 + 32;
                            //add temp data to the temp divs
                            day1TempEl.textContent = "Temp: " + day1TempF.toFixed(2) + "°F";
                            day2TempEl.textContent = "Temp: " + day2TempF.toFixed(2) + "°F";
                            day3TempEl.textContent = "Temp: " + day3TempF.toFixed(2) + "°F";
                            day4TempEl.textContent = "Temp: " + day4TempF.toFixed(2) + "°F";
                            day5TempEl.textContent = "Temp: " + day5TempF.toFixed(2) + "°F";

                            // get icon data and add to icon divs icon-day1, icon-day2, icon-day3, icon-day4, icon-day5
                            let day1Icon = data.list[0].weather[0].icon;
                            const day1IconEl = document.querySelector(".icon-day1");
                            day1IconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + day1Icon + ".png");
                            let day2Icon = data.list[1].weather[0].icon;
                            const day2IconEl = document.querySelector(".icon-day2");
                            day2IconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + day2Icon + ".png");
                            let day3Icon = data.list[2].weather[0].icon;
                            const day3IconEl = document.querySelector(".icon-day3");
                            day3IconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + day3Icon + ".png");
                            let day4Icon = data.list[3].weather[0].icon;
                            const day4IconEl = document.querySelector(".icon-day4");
                            day4IconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + day4Icon + ".png");
                            let day5Icon = data.list[4].weather[0].icon;
                            const day5IconEl = document.querySelector(".icon-day5");
                            day5IconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + day5Icon + ".png");


 //____________________________________local-storage_______________________________________________________
                            //set cityName as an empty array
                            let cityName = { inputValue };
                            //set cityName to local storage from the input value
                            localStorage.setItem("cityName", JSON.stringify(cityName));
                            //get cityName from local storage and set it to list
                            let cityList = JSON.parse(localStorage.getItem("cityName"));
                            const searchHistoryEl = document.querySelector(".search-history");
                            const cityListItem = document.createElement("li");
                            cityListItem.textContent = cityList.inputValue;
                            searchHistoryEl.appendChild(cityListItem);

                        });
                    }
                });


            });
        }
    });
});

