submitBtn = $('#select-city')
currentTime = $('#current-time').text(moment().format('L'))
var weatherIcon = 'http://openweathermap.org/img/wn/'
userInput = $('#user-input').val()
var cityName = userInput

$('#select-city').click(function (event) {
  event.preventDefault();
  
  $('#current-weather').empty()
  $('#fiveDay').empty()

  var searchCity = $('#user-input').val()
  var dayUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&units=imperial&appid=95d015b55c7f192344f9c89c2f0a415b';

  fetch(dayUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
    
      var name = $('<h3>').text(data.name)
      $('#current-weather').append(name)
      
      var date = $('<h3>').text(moment.unix(data.dt).format('MM/DD/yyyy'))
      date.val('')
      $('#current-weather').append(date)
      
      var icon = $('<img>').attr('src', weatherIcon + data.weather[0].icon + '.png')
      var icon = icon.attr("style", "height: 40px; width: 40px")
      $('#current-weather').append(icon)
      
      var temp = $('<h3>').text("Temperature: " + data.main.temp)
      $('#current-weather').append(temp)
      
      var windSpeed = $('<h3>').text("Wind Speed: " + data.wind.speed)
      $('#current-weather').append(windSpeed)
      
      var humid = $('<h3>').text("Humidity: " + data.main.humidity)
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
      var uvi = $('<h3>').text("UV Index: " + data.current.uvi)
      $('#current-weather').append(uvi)

      // five-day-forecast
      for (var i = 0; i < 5; i++) {
        
        var temp = data.daily[i].temp.day
        var humid = data.daily[i].humidity
        var icon = data.daily[i].weather[0].icon
        var unixTime = data.daily[i].dt;
        var date = new Date(unixTime * 1000);
        var date = (date.toLocaleDateString("en-US"));
        
        var dailyDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2 col-3 col-md-2' style='width: 8.5rem; height: 15rem;'>");
        var h5date = $("<h4 class='card-title'>").text(date);
        var pTemp = $("<p class='card-text'>").text("Temp: " + temp);
        var pHum = $("<p class='card-text'>").text("Humidity: " + humid);
        var imgIcon = $('<img>').attr('src', weatherIcon + icon + '.png')
        var imgIcon = imgIcon.attr('style',"height: 40px; width: 40px")

        dailyDiv.append(h5date);
        dailyDiv.append(pTemp);
        dailyDiv.append(pHum);
        dailyDiv.append(imgIcon);
        $("#fiveDay").append(dailyDiv);

        


      }
    })
}












