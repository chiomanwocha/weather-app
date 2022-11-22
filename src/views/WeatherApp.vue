<template >
<div class="button-float">
            <router-link to="/"><button>Back</button></router-link>
        </div>
    <div class="weather-app">
        <div >
        <div class="date">
            <h1>Today, {{date}} {{month}}</h1>
            <p v-if="error">{{errorMessage}}</p>
        </div>
        <div class="search">
            <input type="text" name="search" id="search" placeholder="search .." v-model="query" @keyup.enter="searchWeather">
            <button @click="searchWeather">Search</button>
        </div>
    </div>
    <div class="construction" v-if="!res">
        <p>Nothing to show yet ! search for a location ..</p>
        <img src="../assets/Breaking-barriers-pana.svg" alt="construction">
    </div>
    <div class="lds-default" v-if="loading"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <div class="weather-body" v-if="res && !loading">
        <h1>{{location}}, {{abbr}}</h1>
        <Icon class="icon" icon="carbon:partly-cloudy" v-if="clouds"/>
        <Icon class="icon" icon="material-symbols:rainy-outline" v-if="rain"/>
        <Icon class="icon" icon="ion:snow" v-if="snow"/>
        <Icon class="icon" icon="material-symbols:thunderstorm-outline" v-if="thunderstorm"/>
        <Icon class="icon" icon="ri:drizzle-line" v-if="drizzle" />
        <h2>{{weatherType}}</h2>
        <p>{{weatherTypeDesc}}</p>
        <div class="weather-description">
            <div class="wind">
                <p class="bold">Wind</p>
                {{wind}}
            </div>
            <div class="humidity">
                <p class="bold">Humidity</p>
                {{humidity}}
            </div>
            <div class="temperature">
                <p class="bold">Temperature</p>
                {{temperature}} °C
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import '@/assets/css/app.css'
import { Icon } from '@iconify/vue';
    import axios from "axios";
    export default {
        name: 'WeatherApp',
        mounted(){
            this.formatDate()
        },
        components: {
		Icon,
	},
        data(){
            return{
            apiKey: process.env.VUE_APP_APIKEY,
            url: process.env.VUE_APP_URL,
            query: '',
            weather: {},
            error: false,
            res: false,
            errorMessage: '',
            date: '',
            month: '',
            weatherType: '',
            weatherTypeDesc: '',
            wind: '',
            humidity: '',
            temperature: '' ,
            location: '',
            abbr: '',
            clouds: false,
            rain: false,
            snow: false,
            thunderstorm: false,
            drizzle: false,
            loading: false
            }
        },
        methods: {
            searchWeather(){
                this.loading = true
                axios.get(`${this.url}/weather?q=${this.query}&appid=${this.apiKey}&units=imperial`)
                .then(response => {
                    this.loading = false
                    this.res = true
                    this.error = false
                    this.clouds = false
                    this.rain = false
                    this.snow = false
                    this.thunderstorm = false
                    this.drizzle = false
                    this.weather = response.data
                    this.weatherType = response.data.weather[0].main
                    if (this.weatherType == 'Clouds' || this.weatherType == 'Atmosphere' || this.weatherType == 'Clear'){
                        this.clouds = true
                    }
                    if (this.weatherType == 'Rain'){
                        this.rain = true
                    }
                    if (this.weatherType == 'Snow'){
                        this.snow = true
                    }
                    if (this.weatherType == 'Thunderstorm'){
                        this.thunderstorm = true
                    }
                    if (this.weatherType == 'Drizzle'){
                        this.drizzle = true
                    }
                    this.weatherTypeDesc = response.data.weather[0].description
                    this.wind = response.data.wind.deg
                    this.humidity = response.data.main.humidity
                    this.temperature = response.data.main.temp
                    this.location = response.data.name
                    this.abbr = response.data.sys.country
                    this.query = ''
                })
                .catch(error => {
                    this.error = true
                    this.errorMessage = error.response.data.message
                })
            },
            formatDate(){
                let date = new Date().getDate()
                this.date = date
                let month = new Date().getMonth()
                let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                this.month = monthNames[month]
            }
        }
    }
</script>