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
        const apikey = "4e70ade8232881871018869e68554465";
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lng}&appid=${apikey}&units=metric`;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            let temp = data.main.temp;
            let weather = data.weather[0].main
            localStorage.setItem("temp", temp);
            localStorage.setItem("weather", weather);
            this.updateActivity(temp);
            this.updatePokemon(weather);
        }).catch(err => {
            console.log(err);
        })
    }

    updateActivity(temp) {
        const activityText = document.querySelector(".activity-text");
        if (temp < 10) {
            activityText.innerHTML = "Too cold to catch them outside, luckily you have your Nintendo!";
        } else if (temp < 15) {
            activityText.innerHTML = "Inside or outside, the choice is yours!";
        } else {
            activityText.innerHTML = "Its warm outside, go catch some Pokemon in the park!";
        }
    }

    updatePokemon(weather) {
        const pokeText = document.querySelector(".poke-text");
        var type;
        var text;

        switch (weather) {
            case "Clear":
                // Grass
                type = 12;
                text = "A clear sky, perfect to catch grass pokemon."
                break;

            case "Thunderstorm":
                // Electric
                type = 13;
                text = "A thunderstorm, perfect to catch electric pokemon."
                break;

            case "Drizzle":
                // Water
                type = 11;
                text = "Drizzling, perfect to catch water pokemon."
                break;

            case "Rain":
                // Water
                type = 11;
                text = "Raining, perfect to catch water pokemon."
                break;

            case "Snow":
                // Ice
                type = 15;
                text = "Snowing, perfect to catch ice pokemon."
                break;

            case "Clouds":
                // Normal
                type = 1;
                text = "Cloudy, perfect to catch normal pokemon."
                break;

            case "Ash":
                // Fire
                type = 10;
                text = "Ashy, perfect to catch fire pokemon."
                break;

            case "Tornado":
                // Flying
                type = 3;
                text = "A tornado, perfect to catch flying pokemon."
                break;

            case "Smoke":
                // Poison
                type = 4;
                text = "Smoky, perfect to catch poison pokemon."
                break;

            case "Dust":
                // Ground
                type = 4;
                text = "Dusty, perfect to catch ground pokemon."
                break;
        }

        pokeText.innerHTML = "Weather: " + text;

        let typeUrl = "https://pokeapi.co/api/v2/type/" + type;
        fetch(typeUrl).then(response => {
            return response.json();
        }).then(data => {
            console.log(data.pokemon);
            this.pickPokemonOfType(data.pokemon);
        }).catch(err => {
            console.log(err);
        })
    }

    pickPokemonOfType(allPokemonOfType) {
        const pokeName = document.querySelector(".poke-name");
        const random = Math.floor(Math.random() * allPokemonOfType.length);
        let randomPokemon = allPokemonOfType[random].pokemon;
        pokeName.innerHTML = randomPokemon.name.charAt(0).toUpperCase() + randomPokemon.name.slice(1);
        this.updatePokemonImage(randomPokemon.url);
    }

    updatePokemonImage(pokemonUrl) {
        const pokeImg = document.querySelector(".poke-img");
        fetch(pokemonUrl).then(response => {
            return response.json();
        }).then(data => {
            pokeImg.src = data.sprites.other["official-artwork"].front_default;
        }).catch(err => {
            console.log(err);
        })
    }
}

let app = new App();