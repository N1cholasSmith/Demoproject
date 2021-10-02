// import { createApi } from "unsplash-js";

// no longer needed
// var SearchBoxEl = document.querySelector("#SearchBox-input")
var bodyEl = document.querySelector("body");
var countryInfo = document.querySelector("#countryInformation")
var countryData = [];
var weatherData = [];
var openWeatherMapAPiKey = '1f9d3014d1a028a24c084adbdcec9008';
var upsplashAccessKey = "sUG4r-Ray's-Key ";
var upsplashUrl = ""; 

function getParams () {
    // Get the country name out of the URL
    let searchParamsArr = document.location.search.split("?");
    console.log(searchParamsArr);
    var country = searchParamsArr[1].split("=").pop();
    console.log("country: " + country);

    upsplashGetDataUrl = "https://api.unsplash.com/search/photos/?client_id=" 
    + upsplashAccessKey 
    + "&query=" 
    + country 
    + "&order_by=relevant"
    + "&page=1"
    + "&per_page=10"
    + "&auto=format"
    // + "&color=colorOfChoice" - this parameter can be added later if certain color theme best match the website and fonts display
    ;

    upsplashGetPhotoUrl = "https://api.unsplash.com/photos/?client_id=" 
    + upsplashAccessKey 
    + "&id=";

    fetchCountryPhoto(upsplashGetDataUrl);

    fetchCountryData(country);

    fetchWeatherData(country);
}

// Moved the fetch data function from script.js to here
// Avoided using localStorage to reduce chance of error
function fetchCountryData(country){
    // Change the first and last character on fetch URL from ` to '
    // Was causing the country variable not recognised issue
    fetch('https://travelbriefing.org/' + country + '?format=json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        countryData = data;
        console.log(countryData);
        countryInfoCard();
    })
    .catch(err => {
        console.error(err);
    });
}

// Fetch photo data from upsplash
function fetchCountryPhoto(dataUrl, photoUrl) {
    console.log("UpsplashUrl: " + dataUrl);
    fetch(dataUrl)
    .then(response => {
        console.log(response)
        return response.json();
    })
    .then(data => {
        console.log(data);
        console.log(data.results[0].id);
        let firstRelevantPhotoID = data.results[0].id;
        let firstRelevantPhotoUrl = data.results[0].urls.full;
        console.log(firstRelevantPhotoUrl);
        // upsplashGetPhotoUrl += firstRelevantPhotoID;
        // console.log(upsplashGetPhotoUrl);

        bodyEl.style = "background-image: url(" + firstRelevantPhotoUrl + ")";
    })
    .catch(err => {
        console.error(err);
    });
}

// Fetch weather data
function fetchWeatherData(country) {
    let openWeatherMapUrl = "https://api.openweathermap.org/data/2.5/weather?q=" 
    + country
    + "&units=metric&appid=" 
    + openWeatherMapAPiKey;

    fetch(openWeatherMapUrl)
        .then(function (response) {
            if(!response.ok) {
            throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            weatherData = data;
          })
        .catch(function (error) {
            console.log(error);
          });
}

function countryInfoCard() {

    countryInfo.innerHTML = "";

    var infoList = document.createElement("div");
    var unorderedList = document.createElement("ul");
    var countryName = document.createElement("li");
    var currency = document.createElement("li");
    var rate = document.createElement("li");
    var languageSpoken = document.createElement("li");
    var electricity = document.createElement("li");
    var volt = document.createElement("li");
    var frequency = document.createElement("li");
    var waterQuality = document.createElement("li");

    var tempEl = document.createElement("li");
    var feelsLikeEl = document.createElement("li");
    var humidityEl = document.createElement("li");
    var weatherIconLiEL = document.createElement("li");
    var weatherIconEl = document.createElement("img");
    weatherIconLiEL.appendChild(weatherIconEl);


    countryName.textContent = countryData.names.name
    currency.textContent = "Currency: " + countryData.currency.code
    rate.textContent  = "Rate: " + countryData.currency.rate
    languageSpoken.textContent = "Language: " + countryData.language[0].language
    // electricity.textContent = searchHistory.electricity
    volt.textContent = "Voltage: " + countryData.electricity.voltage
    frequency.textContent = "Frequency: " + countryData.electricity.frequency
    waterQuality.textContent = "Water Quality: " + countryData.water.short

    tempEl.textContent = "Temperature: " + weatherData.main.temp;
    feelsLikeEl.textContent = "Feels like: " + weatherData.main.feels_like;
    humidityEl.textContent = "Humidity: " + weatherData.main.humidity;
    let weatherIcon = weatherData.weather[0].icon;
    weatherIconEl.setAttribute('src', 'http://openweathermap.org/img/wn/' 
        + weatherIcon
        + '@2x.png');


    countryInfo.append(infoList);
    infoList.append(unorderedList);
    // unorderedList.appendChild(countryName);
    // unorderedList.appendChild(currency);
    // unorderedList.appendChild(rate);
    // unorderedList.appendChild(languageSpoken);
    // unorderedList.appendChild(electricity);
    // unorderedList.appendChild(volt);
    // unorderedList.appendChild(frequency);
    // unorderedList.appendChild(waterQuality);
    // unorderedList.appendChild(tempEl);
    // unorderedList.appendChild(feelsLikeEl);
    // unorderedList.appendChild(humidityEl);
    // unorderedList.appendChild(weatherIconLiEL);

    // Option 2 to keep it more neat
    unorderedList.append(countryName, 
        currency,
        rate,
        languageSpoken,
        electricity,
        volt,
        frequency,
        waterQuality,
        tempEl,
        feelsLikeEl,
        humidityEl,
        weatherIconLiEL)
};  

getParams();
