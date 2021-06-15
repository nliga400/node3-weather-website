const request = require('postman-request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ed6c45b987cb1a6873b46e6f4ac678cc&query='+lat+','+lon
  //  console.log(url)

    request({url: url, json:true},(error, {body}) => {
        if(error) {
            callback('unable to connect to weather service')
        } else if (body.error) {
            callback('unable to find location')
        } else {
            callback(undefined, {
                weather_description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity
            })
        }
    })
}

module.exports = forecast