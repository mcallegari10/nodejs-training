const request = require('postman-request')

const url = 'http://api.weatherstack.com/current?access_key=52d4b7f096c7a8f68d9c80b5d66848fe&query=37.8267,-122.4233'

request(url, { json: true }, (_, response) => {
  const { temperature, feelslike } = response.body.current
  console.log(`It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`)
})

const geocodeURL = ''

request(geocodeURL, { json: true }, (_, response) => {
  console.log(response.body)
})
