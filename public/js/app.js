/*=======================
Working With App.js file
========================= */
// Api Key 
const apikey = 'ee636c2391131b6e8d81c2f3b877ecb1';

// selector 
const inputFields = document.querySelector("#input-fields"),
    message = document.querySelector(".message"),
    weatherImg = document.querySelector(".weather-img"),
    weatheInput = document.querySelector(".weather-input"),
    weatherWrapper = document.querySelector(".weather-wrapper"),
    leftBtn = document.querySelector(".left-arrow"),
    weatherTemp = document.querySelector(".weather-text .temp"),
    weather = document.querySelector(".weather"),
    UserLocation = document.querySelector(".location .locate"),
    fellingTemp = document.querySelector(".felling__temp"),
    humadity = document.querySelector(".humidity__percent");


// Get Input Value 
inputFields.onkeypress = (event) => {
    let inputVal = inputFields.value;
    if (event.key === "Enter") {
        FetchWeather(inputVal);
        inputFields.value = "";
    }
}

// function for fetch weather 
function FetchWeather(cityname) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod != 404) {
                message.classList.remove("error");
                message.textContent = "Getting Location.....";
                message.classList.add("success");
                setTimeout(function () {

                    weatheInput.classList.remove("active");
                    weatherWrapper.classList.add("active");
                    let ImgSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                    weatherImg.src = ImgSrc;
                    weatherTemp.textContent =  `${Math.floor(data.main.temp)} ° C`;
                    weather.textContent = `${data.weather[0].description}`
                    UserLocation.textContent = `${data.name}, ${data.sys.country}`
                    fellingTemp.textContent = `${Math.floor(data.main.feels_like)} ° C`;
                    humadity.textContent = `${Math.floor(data.main.humidity)} %`;


                },1000)

            } else {
                message.classList.remove("success");
                message.textContent = data.message;
                message.classList.add("error");
            }
        })
}



// back left button work 

leftBtn.addEventListener("click", function () {
    weatheInput.classList.add("active");
    weatherWrapper.classList.remove("active");
    message.classList.remove("success", "error");

})