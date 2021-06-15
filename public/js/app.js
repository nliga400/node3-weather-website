const weatherForm = document.querySelector('form')
const searchElements = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = searchElements.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {

        if (data.error) {
            console.log(data.error)
            messageOne.textContent = data.error
        } else {
            console.log(data.location)
            console.log(data.forecast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast.weather_description + ', temperature is ' + data.forecast.temperature + ' and it feels like ' + data.forecast.feelslike
        }
    })
})

    console.log(location)
})

