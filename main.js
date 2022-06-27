//default card
fetch(
  `https://api.weatherapi.com/v1/forecast.json?key=0ea279206cd24f0cb5222552222306&q=Singapore&days=1&aqi=no&alerts=no`
)
  .then((response) => response.json())
  .then((data) => {
    const defaultCityName = document.querySelector(".cityName");
    const defaultCityTemp = document.querySelector(".temp");
    const defaultDetail1 = document.querySelector(".detail-1");
    const defaultDetail2 = document.querySelector(".detail-2");
    defaultCityName.innerHTML = data.location.name;
    defaultCityTemp.innerHTML = `${Math.round(data.current.temp_c)}°`;
    defaultDetail1.innerHTML = data.current.condition.text;
    defaultDetail2.innerHTML = `Max ${Math.round(
      data.forecast.forecastday[0].day.maxtemp_c
    )}° Min ${Math.round(data.forecast.forecastday[0].day.mintemp_c)}°`;
  });

//add card
function displayData(data) {
  const cityName = data.location.name;
  const cityTemp = Math.round(data.current.temp_c);
  const cityCondition = data.current.condition.text;
  const cityMax = Math.round(data.forecast.forecastday[0].day.maxtemp_c);
  const cityMin = Math.round(data.forecast.forecastday[0].day.mintemp_c);
  const itemsContainer = document.querySelector(".cityContainer");
  var newCard = document.querySelector(".newcard");

  itemsContainer.innerHTML += `<div class="card newcard"  draggable="true" ondragstart="toggleBin()" ondragend="toggleBin()" onclick="window.location.href = 'cityFocus.html?location=${cityName}'">
          <div class="row">
            <div class="col">
              <h2 class="cityName">${cityName}</h2>
            </div>
            <div class="col">
              <h1 class="temp">${cityTemp}°</h1>
            </div>
          </div>
          <div class="row">
            <div class="class">
              <p class="details detail-1">${cityCondition}</p>
            </div>
            <div class="class">
              <p class="details detail-2">Max. ${cityMax}° Min ${cityMin}°</p>
            </div>
          </div>
        </div>`;
  const binContainer = document.querySelector(".binContainer");
  binContainer.innerHTML = `<svg
            class="binBox"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ondragover="dragOver(event)"
            ondragleave="dragLeave()"
            ondrop="removeCard(event)"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            ></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>`;
}

//remove card

function removeCard(event) {
  event.preventDefault();
  const newcard = document.querySelector(".newcard");
  // newcard.parentNode.removeChild(newcard);
  newcard.remove();
  localStorage.clear();
}

//fetch data of city user input
function fetchWeatherData() {
  const cityInput = document.getElementById("userInput").value;
  const fetchCity = `https://api.weatherapi.com/v1/forecast.json?key=0ea279206cd24f0cb5222552222306&q=${cityInput}&days=1&aqi=no&alerts=no`;
  const cardLimit = document.querySelectorAll(".cityContainer > div").length;
  if (cardLimit < 3) {
    fetch(fetchCity)
      .then((response) => response.json())
      .then((data) => {
        displayData(data);
        let lsCities = JSON.parse(localStorage.getItem("city")) || []; // if lsCities is null, it will be [] an empty array.
        if (lsCities.length < 2) {
          lsCities.push(data);
          localStorage.setItem("city", JSON.stringify(lsCities));
        }
      });
  }

  toggleForm();
}

//display from local storage
function displayFromStorage() {
  let lsCities = JSON.parse(localStorage.getItem("city"));
  for (let i = 0; i < lsCities.length; i++) {
    const cityName = lsCities[i].location.name;
    const cityTemp = Math.round(lsCities[i].current.temp_c);
    const cityCondition = lsCities[i].current.condition.text;
    const cityMax = Math.round(
      lsCities[i].forecast.forecastday[0].day.maxtemp_c
    );
    const cityMin = Math.round(
      lsCities[i].forecast.forecastday[0].day.mintemp_c
    );
    const itemsContainer = document.querySelector(".cityContainer");
    itemsContainer.innerHTML += `<div class="card newcard"  draggable="true" ondragstart="toggleBin()" ondragend="toggleBin()" onclick="window.location.href = 'cityFocus.html?location=${cityName}'">
          <div class="row">
            <div class="col">
              <h2 class="cityName">${cityName}</h2>
            </div>
            <div class="col">
              <h1 class="temp">${cityTemp}°</h1>
            </div>
          </div>
          <div class="row">
            <div class="class">
              <p class="details detail-1">${cityCondition}</p>
            </div>
            <div class="class">
              <p class="details detail-2">Max. ${cityMax}° Min ${cityMin}°</p>
            </div>
          </div>
        </div>`;
    const binContainer = document.querySelector(".binContainer");
    binContainer.innerHTML = `<svg
            class="binBox"
            xmlns="https://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ondragover="dragOver(event)"
            ondragleave="dragLeave()"
            ondrop="removeCard(event)"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            ></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>`;
  }
}

//display or hide add bar
function toggleForm() {
  const cardLimit = document.querySelectorAll(".cityContainer > div").length;
  if (cardLimit < 3) {
    var i = document.getElementById("addCityForm");
    if (i.style.display === "block") {
      i.style.display = "none";
    } else {
      i.style.display = "block";
    }
  }
}

function toggleBin() {
  var i = document.querySelector(".binBox");
  if (i.style.display === "block") {
    i.style.display = "none";
  } else {
    i.style.display = "block";
  }
}

function dragOver(event) {
  event.preventDefault();
  i = document.querySelector(".binBox");
  i.style.color = "red";
  i.style.backgroundColor = "#d0d0d088";
  i.style.borderRadius = "50%";
  i.style.padding = "8px";
  i.style.transform = "scale(105%)";
}

function dragLeave() {
  i = document.querySelector(".binBox");
  i.style.color = "#d0d0d0";
  i.style.backgroundColor = "";
  i.style.borderRadius = "";
  i.style.padding = "";
  i.style.transform = "";
}

displayFromStorage();
