function GetClock(){
    var d=new Date();
    var nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getFullYear();
    var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds();
    if(nmin<=9) nmin="0"+nmin
    if(nsec<=9) nsec="0"+nsec;

    document.getElementById('clockbox').innerHTML=""+ndate+"-"+(nmonth+1)+"-"+nyear+" "+nhour+":"+nmin+":"+nsec+"";
}

window.onload=function(){
    GetClock();
    setInterval(GetClock,1000);
}

//var weatherData = 'http://api.openweathermap.org/data/2.5/forecast?q=mbanga&APPID=33fb7454eb75c6a062a86f7f0ee2695a ';
const api = 'https://api.openweathermap.org/data/2.5/forecast?q='
const apiKey = '&APPID=33fb7454eb75c6a062a86f7f0ee2695a'
const unit = '&units=metric'

var btnSubmit = document.getElementById('submit')
let cityName, weatherData, cityNameToLower;
btnSubmit.addEventListener('click', fetchWeather)

function fetchWeather(){
    cityName = document.querySelector('#search_city').value;
    cityNameToLower = cityName;
    if(cityName !== ''){
        weatherData = api + cityNameToLower + apiKey + unit;
    }
    
    fetch(weatherData)
        .then((result) => result.json())
        .then( (output) => processWeather(output))
        .catch(function(error){
console.log('error')
})
}

function processWeather(weatherJSON){
    console.log(weatherJSON);
    document.querySelector('.curent-info').style.display = 'flex';
    var displayCity = document.querySelector('.city');
    displayCity.style.textTransform = 'uppercase';
    var country = weatherJSON.city.country;
    displayCity.innerHTML = 'Weather in ' + cityName + ', ' + '<span>' + country + '</span>';
    var weatherDescrip = weatherJSON.list[0];
    var currentDescrip = document.querySelector('.state');
    var wind = document.querySelector('.wind');
    wind.innerHTML = 'Wind: ' + weatherDescrip.wind.speed + ' m/s'
//    var image = document.getElementById('icons-img');
//    var iconcode =  weatherDescrip.weather[0].icon;
//    var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
//    image.src = iconUrl
    currentDescrip.innerHTML = 'Today: ' + weatherDescrip.weather[0].description;
    var mainTemp = document.querySelector('.current-temp');
    mainTemp.innerHTML = 'The temperature is: ' +  weatherDescrip.main.temp + ' °C';
    var maxMinTemp = document.querySelector('.max-min');
    maxMinTemp.innerHTML = 'Forecast of today: ' + '&#8657; ' +  weatherDescrip.main.temp_max + ' °C &nbsp;' + '&nbsp;' + ' &#8659; '+ weatherDescrip.main.temp_min + ' °C';
    var humidity = document.querySelector('.humidity')
    humidity.innerHTML = 'Humidity: ' + weatherDescrip.main.humidity + ' &#37;';
}












