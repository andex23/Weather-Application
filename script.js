// Object containing methods for fetching and displaying weather data
let weather = {
    "apiKey": "630f85ed71a2ec8289a6cdeb058f80f3", // Your OpenWeatherMap API key
    // Function to fetch weather data for a given city
    fetchWeather: function(city) {
        // Construct and execute the fetch request using the city and API key
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        )
        .then((response) => response.json()) // Parse the JSON response
        .then((data) => this.displayWeather(data)) // Call displayWeather with the data
        .catch((error) => console.error("Error fetching data: ", error)); // Log errors to the console
    },
    // Function to display the fetched weather data
    displayWeather: function(data) {
        const { name } = data; // Extract the city name
        const { icon, description } = data.weather[0]; // Extract the weather icon and description
        const { temp, humidity } = data.main; // Extract temperature and humidity
        const { speed } = data.wind; // Extract wind speed
        // Update the DOM elements with the new weather data
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading"); // Remove the loading class
    },
    // Function to initiate a weather data fetch for the current search bar value
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

// Event listener for the search button click event
document.querySelector(".search button").addEventListener("click", function(){
    weather.search(); // Call the search function when the button is clicked
});

// Event listener for the 'Enter' key in the search bar
document.querySelector(".search-bar").addEventListener("keyup", function (event){
    if (event.key == "Enter") {
        weather.search(); // Call the search function when 'Enter' is pressed
    }
});


// Initial fetch of weather data for Abuja
weather.fetchWeather("Abuja");
