const request = require('postman-request')

const geocode = (address = 'New York' , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmxpZ2E0MDAiLCJhIjoiY2twbTdoc3FsMDQ5YjJvbzVtd2V1M2RlaCJ9.BQ38lDR1zQt6sj2np12lYw&limit=2'
    
    request({url: url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services.')
        } else if (!body.features) {
            callback('No response from Location services.')
        } else if (body.features.length === 0 ) {
            callback('Unable tolocate the city.')
        } else {
           callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name 
           })
        }
    })
}

module.exports = geocode