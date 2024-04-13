import './output.css'

console.log('Hello, World!')
const apiKey = 'bfc564c71d9743fb9c5151258241204'

async function getWeather(location) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
  if (data.error) {
    console.log(data.error.message)
    return data.error.message
  }
  return data
}

getWeather('')
