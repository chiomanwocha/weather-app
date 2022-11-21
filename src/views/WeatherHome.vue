<template>
  <div>
    <h1>
      Daily<div>Weather</div>
    </h1>
    <div class="home-illustration">
      <img src="@/assets/Umbrella-bro.svg" alt="a girl holding umbrella">
    </div>
    <router-link to="weather-app"><button>Click me to start</button></router-link>
  </div>
</template>

<script>

export default {
  name: 'WeatherHome',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1{
    font-weight: 100;
    /* text-align: justify; */
    font-size: 45px;
    padding-top: 50px;
    margin: 0;
  }
  h1>div{
    font-weight: 900;
  }
  .home-illustration{
    width: 30vw;
    margin: 0 auto
  }
  button{
    width: 20vw;
    border-radius: 5px;
    padding: 15px;
    font-size: 16px;
    border: none;
    font-weight: 700;
    box-shadow: 0 0 5px grey;
    cursor: pointer;
  }
  button:hover{
    color: white;
    background-color: #C53F3E;
    transition: .3s;
  }
</style>

