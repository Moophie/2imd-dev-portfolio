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
            console.log(temp);
            console.log(weather);
            this.updateActivity(temp);
            this.updatePokemon(weather);
        }).catch(err => {
            console.log(err);
        })
    }

    updateActivity(temp) {
        const activityText = document.querySelector(".activity-text");
        if (temp < 10) {
            activityText.innerHTML = "Brr, way too cold to go catch pokemon outside. Better stay inside and grab your Nintendo!";
        } else if (temp < 15) {
            activityText.innerHTML = "Go catch some pokemon outside with Pokemon Go! Don't forget your jacket, it's not that warm.";
        } else {
            activityText.innerHTML = "Its really hot outside, grab your mobile phone and go catch some pokemon in the park!";
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
                text = "The sun is shining, the perfect time to catch grass type pokemon."
                break;

            case "Thunderstorm":
                // Electric
                type = 13;
                text = "A thunderstorm is raging, the perfect time to catch electric type pokemon."
                break;

            case "Drizzle":
                // Water
                type = 11;
                text = "There's a light drizzle, the perfect time to catch water type pokemon."
                break;

            case "Rain":
                // Water
                type = 11;
                text = "It's raining, the perfect time to catch water type pokemon."
                break;

            case "Snow":
                // Ice
                type = 15;
                text = "It's snowing, the perfect time to catch ice type pokemon."
                break;

            case "Clouds":
                // Normal
                type = 1;
                text = "It's slightly cloudy, the perfect time to catch normal type pokemon."
                break;

            case "Ash":
                // Fire
                type = 10;
                text = "There's ash in the air, the perfect time to catch fire type pokemon."
                break;

            case "Tornado":
                // Flying
                type = 3;
                text = "A tornado is raging, the perfect time to catch flying type pokemon."
                break;

            case "Smoke":
                // Poison
                type = 4;
                text = "There's smoke in the air, the perfect time to catch poison type pokemon."
                break;

            case "Dust":
                // Ground
                type = 4;
                text = "There's dust in the air, the perfect time to catch ground type pokemon."
                break;
        }

        pokeText.innerHTML = text;

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