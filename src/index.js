import './output.css'

console.log('Hello, World!')
const apiKey = 'bfc564c71d9743fb9c5151258241204'

async function getWeather(location) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`
  const response = await fetch(url)
  const data = await response.json()
  if (data.error) {
    console.log(data.error.message)
    return data.error.message
  }
  return data
}

const locationInputElement = document.getElementById('location-input')
const getWeatherButtonElement = document.getElementById('get-weather')

getWeatherButtonElement.addEventListener('click', async () => {
  const location = locationInputElement.value
  const weatherData = await getWeather(location)
  console.log(weatherData)
  displayWeatherData(weatherData)
})

function displayWeatherData(weatherData) {
  const weatherDataElement = document.getElementById('weather-data')

  const location = weatherData.location.name
  const country = weatherData.location.country
  const temperatureCelsius = weatherData.current.temp_c
  const temperatureFahrenheit = weatherData.current.temp_f
  const humidity = weatherData.current.humidity
  const lastUpdated = weatherData.current.last_updated
  const windSpeed = weatherData.current.wind_kph
  const weatherCondition = weatherData.current.condition.text
  const iconUrl = 'https://' + weatherData.current.condition.icon.slice(2)

  weatherDataElement.innerHTML = `
    <p class="text-4xl mb-6">${location}, ${country}</p>
    <p class="text-6xl self-center mb-4" id="temperature">${temperatureCelsius}°C</p>
    <div class="flex items-center">
      <p class="text-4xl">${weatherCondition}</p>
      <img src="${iconUrl}" alt="${weatherCondition}""/>
    </div>
    <p class="text-2xl">Humidity: ${humidity}%</p>
    <p class="text-2xl">Wind Speed: ${windSpeed} km/h</p>
    <p class="text-sm">${lastUpdated}</p>
    `

  const temperatureElement = document.getElementById('temperature')
  temperatureElement.addEventListener('click', () => {
    if (temperatureElement.textContent.endsWith('°C')) {
      temperatureElement.textContent = `${temperatureFahrenheit}°F`
    } else {
      temperatureElement.textContent = `${temperatureCelsius}°C`
    }
  })
}
