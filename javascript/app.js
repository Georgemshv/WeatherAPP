const input = document.getElementById("name");
const submit = document.getElementById("click");
const key = "d95d54615b72d39a5cdb819b25b441b2"
const sensitivity = document.querySelector(".sens");
const county = document.querySelector(".h5");
const temp = document.querySelector(".Temperature")
const min_temp = document.querySelector(".Temperature-mn")
const max_temp = document.querySelector(".Temperature-mx")
const speed = document.querySelector(".wind-speed")
const rem = document.querySelector(".rm")
const cnt = document.querySelector(".country")
const weatherr = document.querySelector(".wh")
const weather2 = document.querySelector(".wh2")

const WeatherAPI = (url) =>{
    return new Promise((resolve , reject) =>{
        fetch(url)
          .then(response => response.json())
            .then(main_response => {
               if(main_response.cod === 200){
                 resolve(main_response)
               }else{
                   reject("Not Found" + " " + main_response.cod)
               }
            })
            .catch(err =>{
                reject(err)
            })
    })
}

const draw = (json_text) =>{
    county.textContent = json_text.name;
    sensitivity.innerHTML = "მგრძნობელობა:" + " "+ json_text.main.feels_like + "<span>&#8451;</span>"
    temp.innerHTML = "ტემპერატურა:" + " " + json_text.main.temp + "<span>&#8451;</span>"
    min_temp.innerHTML = "მინიმალური ტემპერატურა:" + " " + json_text.main.temp_min + "<span>&#8451;</span>"
    max_temp.innerHTML = "მაქსიმალური ტემპერატურა:" + " " + json_text.main.temp_max + "<span>&#8451;</span>"
    speed.textContent = "ქარის სიჩქარე :" + " " + json_text.wind.speed + " მ/წმ"
    cnt.innerHTML= "ქვეყანა:" + " " + json_text.sys.country 
    weatherr.textContent = "ამინდი: " + json_text.weather[0].main + " , " + json_text.weather[0].description
    weather2.textContent = "ტენიანობა: " + " " +json_text.main.humidity + "%"
    const cont = document.querySelector(".container")
    const snowflakes =  document.querySelector(".snowflakes");
    const snowBox = document.querySelector(".snow-box")

    function dom(response){
        if(response.snow){
            snowBox.style.backgroundImage = "url('../images/snowflake.png')"
            cont.style.backgroundImage = "url('../images/snow.jpg')"
            snowflakes.classList.remove('none')
        }
        else if(response.main.temp < "5"){
            snowBox.style.backgroundImage = "url('../images/temperatures.png')"
            cont.style.backgroundImage = "url('../images/cold.jpg')"
            snowflakes.classList.add('none')
        } 
        else if(response.main.temp < "20"){
            snowBox.style.backgroundImage = "url('../images/wind.png')"
            cont.style.backgroundImage = "url('../images/nature.jpg')"
            snowflakes.classList.add('none')
            
        }
        else if(response.main.temp <= "40"){
            snowBox.style.backgroundImage = "url('../images/sun.png')"
            cont.style.backgroundImage = "url('../images/sum.jpg')"
            snowflakes.classList.add('none')
        }
        else{
            document.querySelector(".container").classList.remove("tovly")
        }
    }
    dom(json_text)
}
const classlistFunction = () =>{
    document.querySelector(".weather-box").classList.remove("none");
    document.querySelector(".container").classList.remove("J-Center");
    rem.classList.remove("none")
}
submit.addEventListener("click", () =>{
     WeatherAPI("http://api.openweathermap.org/data/2.5/weather?q="+ input.value +"&units=metric"+ "&appid="+ key)
        .then(response =>{
          console.log(response)
          draw(response)
          classlistFunction();
        })
       .catch(errorr =>{
        county.textContent = errorr;
        rem.classList.add("none")
        document.querySelector("h1").textContent = "არ მოიძებნა"
        setTimeout(() => {
            document.querySelector("h1").textContent = "ამინდი"
        }, 3000);
    })

})