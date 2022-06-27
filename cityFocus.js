const id = location.search.split("=")[1];
const fetchCity = `http://api.weatherapi.com/v1/forecast.json?key=0ea279206cd24f0cb5222552222306&q=${id}&days=1&aqi=no&alerts=no`;
fetch(fetchCity)
  .then((response) => response.json())
  .then((data) => {
    const cityName = data.location.name;
    const cityTemp = Math.round(data.current.temp_c);
    const cityCondition = data.current.condition.text;
    const maxTemp = Math.round(data.forecast.forecastday[0].day.maxtemp_c);
    const minTemp = Math.round(data.forecast.forecastday[0].day.mintemp_c);

    //UV index text
    const uvValue = Math.round(data.current.uv);
    var uvText = "";
    var uvComment = "";
    function uvIndex() {
      if (uvValue <= 2) {
        uvText = "Low";
        uvComment = "Low level during all the day.";
      } else if (uvValue <= 5 && uvValue >= 3) {
        uvText = "Moderate";
        uvComment = "Moderate level during all the day.";
      } else if (uvValue <= 7 && uvValue >= 6) {
        uvText = "High";
        uvComment = "High level during all the day.";
      } else if (uvValue <= 8 && uvValue >= 10) {
        uvText = "V High";
        uvComment = "Very high level during all the day.";
      } else {
        uvText = "Extreme";
        uvComment = "Extreme level during all the day.";
      }
    }
    uvIndex();

    const feelsLike = Math.round(data.current.feelslike_c);
    const pressure = Math.round(data.current.pressure_mb);
    const imgCond = data.current.condition.icon;
    const itemsContainer2 = document.querySelector(".displayContainer");
    itemsContainer2.innerHTML = `<div class="backgroundGradient displayContainer">
      <div class="titleContainer">
        <h1 class="title">${cityName}</h1>
        <p class="currentDate">${currentDate}</p>
      </div>
      <div class="goBackButton">
        <svg xmlns="http://www.w3.org/2000/svg" onclick="window.location.href = 'index.html'" class="backSign" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#d0d0d0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14h6v6M3 21l6.1-6.1M20 10h-6V4M21 3l-6.1 6.1"/></svg>
      </div>
      <div class="conditionBanner">
        <img class="imgCond" src="${imgCond}" alt="">
        <h3 class="bannerTemp">${cityTemp}°</h3>
        <h3 class="bannerCond">${cityCondition}</h3>
      </div>
      <div class="cardsContainer">
        <div class="card">
          <div class="row">
            <div class="col minTemp">
              <h3>MIN TEMP</h3>
              <p>${minTemp}° Min</p>
            </div>
          </div>
          <div class="row">
            <div class="col maxTemp">
              <h3>MAX TEMP</h3>
              <p>${maxTemp}° Max</p>
            </div>
          </div>
          <div class="row">
            <div class="col uvIndi">
              <h3>UV Indicator </h3>
              <p class="p1">${uvValue} ${uvText} </p>
              <p class="p2" >${uvComment}</p>
            </div>
          </div>
          <div class="row">
            <div class="col feelsLike">
              <h3>FEELS LIKE</h3>
              <p>${feelsLike}°</p>
            </div>
          </div>
          <div class="row">
            <div class="col pressure">
              <h3>PRESSURE</h3>
              <p>${pressure} hPa</p>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  });

//get current date
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const currentDate = today.toDateString();
