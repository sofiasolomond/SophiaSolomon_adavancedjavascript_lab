const api = {
  key: "7e3f21edee540e6110af347b55eb1ab2",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box')
searchBox.addEventListener('keypress', setQuery)

function setQuery(evnt) {
  if (evnt.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults(cityName) {
  fetch(`${api.base}weather?q=${cityName}&units=metric&appid=${api.key}`)
    .then(weather => {
      return weather.json()
    })
    .then(response => {
      console.log(response)
      displayResults(response)
    });
};

function displayResults(weatherResult) {
  let date = document.querySelector('.location .date');
  let city = document.querySelector('.location .city');
  city.innerText = `${weatherResult.name} ${weatherResult.sys.country}`
  let now = new Date();
  date.innerText = dateBuilder(now)
  let temperature = document.querySelector('.temp')
  temperature.innerHTML = `${Math.round(weatherResult.main.temp)}<span> °c</span>`
  let weather = document.querySelector('.weather')
  weather.innerText = weatherResult.weather[0].main
  let hiLow = document.querySelector('.hi-low')
  hiLow.innerText = "AAAA"
  hiLow.innerText = `Min Temp - ${Math.round(weatherResult.main.temp_min)} °c  / Max-Temp ${Math.round(weatherResult.main.temp_max)} °c `

}

function dateBuilder(dt) {
  let mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let day, date, month, year;
  day = days[dt.getDay()]
  month = mon[dt.getMonth()]
  year = dt.getFullYear()
  return `${day}, ${dt.getDate()} ${month} ${year}`
}

//Loading default Temperature of a city instead of hard coding the values 

getResults('Chennai')