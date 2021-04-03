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
        }).catch(err => {
            console.log(err);
        })
    }

    updateText(temp, weather) {
        
    }

    updateImage() {

    }
}

let app = new App();