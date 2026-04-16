//targeting elements from index.html
let cityInput = document.querySelector("#city-input")
//h1 for city name
let cityName = document.querySelector("#city-name")
//form element
let inputForm = document.querySelector("#input-form")
let tempDisplay = document.querySelector("#temp")
//span to display weather condition
let conditionDisplay = document.querySelector("#condition")
//strong element to dispaly humidity and wind
let hmdtDisplay = document.querySelector("#humidity")
let windDisplay = document.querySelector("#wind")
let dateDisplay = document.querySelector("#date")
let iconDisplay = document.querySelector("#icon")

let apiKey = "bao5t9f4e8f4fd51c321081492282b64"

inputForm.addEventListener("submit", RecieveCityName)

function RecieveCityName(e)
{
    //take city name user entered and fetch weather 
    e.preventDefault()
    let city = cityInput.value
    fetchWeather(city)
}

function fetchWeather(city)
{
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
    fetch(apiURL).then((res)=>res.json()).then((data)=>displayWeather(data))
}

function displayWeather(data)
{
    //dispaying city name from api response
    cityName.innerHTML = data.city
    let temperature = data.temperature.current
    tempDisplay.innerHTML = Math.round(temperature)
    //displaying condition
    let condition = data.condition.description
    conditionDisplay.innerHTML = condition
    //displaying humidity
    let humidity = data.temperature.humidity
    hmdtDisplay.innerHTML = `${humidity}%`
    //converting speed from m/s to km/h
    let windSpeed = data.wind.speed
    let windKm = windSpeed * 3.6
    windDisplay.innerHTML = `${Math.round(windKm)}km/h`
    //converting time from response to readable format
    let date = new Date(data.time * 1000)
    //calling function to format date properly
    dateDisplay.innerHTML = `${formattedDate(date)}`
    //displaying icon from response
    let icon = data.condition.icon_url
    iconDisplay.innerHTML = `<img src="${icon}">`
}

function formattedDate(date){
    let hour = date.getHours()
    let minutes = date.getMinutes()
    if(minutes<10)
    {
        minutes = `0${minutes}`
    }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    let day = days[date.getDay()]
    return `${day} ${hour}:${minutes}`
}