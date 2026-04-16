let cityInput = document.querySelector("#city-input")
let cityName = document.querySelector("#city-name")
let inputForm = document.querySelector("#input-form")
let tempDisplay = document.querySelector("#temp")
//span to display weather condition
let conditionDisplay = document.querySelector("#condition")
//strong element to dispaly humidity and wind
let hmdtDisplay = document.querySelector("#humidity")
let windDisplay = document.querySelector("#wind")

let apiKey = "bao5t9f4e8f4fd51c321081492282b64"

let dateDisplay = document.querySelector("#date")
let iconDisplay = document.querySelector("#icon")

inputForm.addEventListener("submit", displayCity)

function displayCity(e)
{
    e.preventDefault()
    let city = cityInput.value
    console.log(city)
    
    fetchWeather(city)
}

function fetchWeather(city)
{
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
    fetch(apiURL).then((red)=>red.json()).then((data)=>displayWeather(data))
}

function displayWeather(data)
{
    console.log(data)
    cityName.innerHTML = data.city
    let temperature = data.temperature.current
    console.log(temperature)
    tempDisplay.innerHTML = Math.round(temperature)
    //displaying condition
    let condition = data.condition.description
    conditionDisplay.innerHTML = condition

    let humidity = data.temperature.humidity
    hmdtDisplay.innerHTML = `${humidity}%`

    let windSpeed = data.wind.speed
    let windKm = windSpeed * 3.6
    console.log(windSpeed)
    console.log(windKm)
    
    windDisplay.innerHTML = `${Math.round(windKm)}km/h`

    let date = new Date(data.time * 1000)
    console.log(date)
    console.log(date.getDay())
    dateDisplay.innerHTML = `${formattedDate(date)}`

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