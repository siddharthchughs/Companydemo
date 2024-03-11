package com.example.WeatherForecast

data class WeatherResponse(
    val weatherList: List<Weather>
)

data class Weather(
    val id:String,
    val main:String
)


