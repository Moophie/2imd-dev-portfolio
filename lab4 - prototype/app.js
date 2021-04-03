class App {
    constructor() {
        this.getLocation();
        this.lat;
        this.lng
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
        let apikey = "4e70ade8232881871018869e68554465";
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lng}&appid=${apikey}&units=metric`;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })

    }
}

let app = new App();