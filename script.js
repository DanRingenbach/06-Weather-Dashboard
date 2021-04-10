submitBtn = $('#select-city')
currentTime = $('#current-time').text(moment().format('L'))
var weatherIcon = 'http://openweathermap.org/img/wn/'

$('#select-city').click(function (event) {
  event.preventDefault();
  console.log('working')
  var searchCity = $('#user-input').val()
  var dayUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&units=imperial&appid=95d015b55c7f192344f9c89c2f0a415b';

  fetch(dayUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      console.log(data.name)
      console.log(data.dt)
      console.log(data.weather[0].icon)
      console.log(data.main.temp)
      console.log(data.wind.speed)
      console.log(data.main.humidity)
      var name = $('<h3>').text(data.name)
      $('#current-weather').append(name)
      console.log(name)
      var date = $('<h3>').text(moment.unix(data.dt).format('MM/DD/yyyy'))
      $('#current-weather').append(date)
      var icon = $('<img>').attr('src', weatherIcon + data.weather[0].icon + '.png')
      $('#current-weather').append(icon)
      var temp = $('<h3>').text(data.temp)
      $('#current-weather').append(temp)
      var windSpeed = $('<h3>').text(data.wind.speed)
      $('#current-weather').append(windSpeed)
      var humid = $('<h3>').text(data.main.humidity)
      $('#current-weather').append(humid)


      getUvi(data.coord.lat, data.coord.lon);


    })



});

function getUvi(lat, lon) {
  console.log(lat, lon)
  var oneCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=95d015b55c7f192344f9c89c2f0a415b'

  fetch(oneCall)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      var uvi = $('<h3>').text(data.current.uvi)
      $('#current-weather').append(uvi)
    })
}




// submitBtn.click(getApi());

userInput = $('#user-input').val()

var cityName = userInput


