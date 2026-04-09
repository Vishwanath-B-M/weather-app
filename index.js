const weather=document.querySelector(".weatherapp");
const cityinput=document.querySelector(".cityinput");
const card=document.querySelector(".card");
const apikey="c4794ae0735af52e96a47f9652d83129";

weather.addEventListener("submit",async event=>{
    event.preventDefault();
    const city=cityinput.value.trim();
    if(city){
        try{
            const weatherdata=await getweatherdata(city);
            getweatherinfo(weatherdata);

        }
        catch(error){
            console.error(error);
            displayerror(error);
        }

    }
    else{
        displayerror("please enter the city");
    }
    

});
async function getweatherdata(city){
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response=await fetch(apiurl);
    if(!response.ok){
        throw new error("there problem in fetching");
    }
    return await response.json();

}
function getweatherinfo(data){
    const {name:city,
        main:{temp,humidity},
        weather:[{description,id}]}=data;

        card.textContent="";
        card.style.display="flex";
        const displaycity=document.createElement("h1");
        const displaytemp=document.createElement("p");
        const displayhumidity=document.createElement("p");
        const displaydescription=document.createElement("p");
        const weatheremoji=document.createElement("p");

    
        displaycity.textContent=city;
        displaycity.classList.add("displaycity");
        card.appendChild(displaycity);

        displaytemp.textContent=(temp-273.15).toFixed(2);
        displaytemp.textContent+="°C";
        displaytemp.classList.add("displaytemp");
        card.appendChild(displaytemp);

        displayhumidity.textContent=humidity;
        displayhumidity.textContent+="%";
        displayhumidity.classList.add("displayhumidity");
        card.appendChild(displayhumidity);

        displaydescription.textContent=description;
        displaydescription.classList.add("displaydes");
        card.appendChild(displaydescription);

        weatheremoji.textContent=getweatheremoji(id);
        weatheremoji.classList.add("emoji");
        card.appendChild(weatheremoji);

}
function getweatheremoji(weatherid){
    switch(true){
        case (weatherid>=200&&weatherid<300):
        return "🌩️"
        case (weatherid>=300&&weatherid<400):
        return "🌧️"
        case (weatherid>=500&&weatherid<600):
        return "☔️"
        case (weatherid>=600&&weatherid<700):
        return "☃️"
        case (weatherid>=700&&weatherid<800):
        return "🌫️"
        case (weatherid===8000):
        return "🌞"
        case (weatherid>=800):
        return "☁️"
    }

}
function displayerror(message){
    const errors=document.createElement("p");
    errors.textContent=message;
    errors.classList.add("displayerror");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errors);
   
}