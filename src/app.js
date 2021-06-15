//start of script
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request') 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))
const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//console.log(publicDirectoryPath)
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nelio Liga jr'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helptext: 'This is a help page text.',
        name: 'Nelio Liga jr'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nelio Liga Jr.'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
        
        if (error) {
            return res.send({error})
        } 

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

            //console.log(location)
            //console.log(weather_description+'. It is currently',temperature,'degrees out and feels like',feelslike)
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Nelio Liga jr',
        message:'Help Article not found.'
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Nelio Liga jr',        
        message:'Page Not found!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})