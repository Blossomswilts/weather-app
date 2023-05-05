const buttonEl = document.querySelector(".btn");
//Add event listener to button
buttonEl.addEventListener("click", function () {    
    getWeather();
});


let inputEl = document.querySelector(".form-control");
let inputValue = inputEl.value.trim();

function getWeather(inputValue) {
        //get data from API using the value of the input open weather map "http://api.openweathermap.org/geo/1.0/direct?q=" + inputValue + "," + inputValue + "," + inputValue + "&limit=5&appid=bea3f88e1674867f9dbf620b29744907";
    // with the data from the api, i want to add the text information to current-day div
    let apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputValue + "&limit=5&appid=bea3f88e1674867f9dbf620b29744907";
    fetch(apiURL).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            });
        }
    });
}




