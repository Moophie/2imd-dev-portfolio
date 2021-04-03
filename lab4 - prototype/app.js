class App {
    constructor() {
        this.getLocation();
        this.lat;
        this.lng;
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            this.locationSuccess.bind(this),
            this.locationError.bind(this)
        );
    }

    locationSuccess(result) {
        this.lat = result.coords.latitude;
        this.lng = result.coords.longitude;
        this.getWeather();
    }

    locationError(error) {
        console.log(error);
    }

    getWeather() {
        const apikey = "002ff7786663a4aec24da7cb1bf783e3";
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lng}&appid=${apikey}&units=metric`;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            let temp = data.main.temp;
            let weather = data.weather[0].main
            localStorage.setItem("temp", temp);
            localStorage.setItem("weather", weather);
            this.updateActivity(temp);
        }).catch(err => {
            console.log(err);
        })
    }

    updateActivity(temp) {
        const activityText = document.querySelector(".activity-text");
        if (temp < 10) {
            activityText.innerHTML = "Brr, way too cold to go catch Pokemons outside. Better stay inside and grab your Nintendo!";
        } else if (temp < 15) {
            activityText.innerHTML = "Go catch some Pokemons outside with Pokemon Go! Don't forget your jacket, it's not that warm.";
        } else {
            activityText.innerHTML = "Its really hot outside, grab your mobile phone and go catch some Pokemons in the park!";
        }
    }

    updatePokemon(weather) {
        const pokeText = document.querySelector(".poke-text");
        const pokeImg = document.querySelector(".poke-img");
    }
}

let app = new App();