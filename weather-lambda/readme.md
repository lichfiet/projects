## Weather Lambda

[API URL](https://j9dund2fhk.execute-api.us-west-1.amazonaws.com/main/weather)

This is a simple lambda function that returns the current weather based on the IP of the machhine requesting it. It uses the [OpenWeatherMap API](https://openweathermap.org/api) to get the weather data, and the [ip-api](https://ip-api.com/) to get the location of the requesting machine. The api is set up with a resource on an API Gateway, and very simply passes the IP address of the machine requesting the data to the lambda function, which then returns the weather data.

### Returns:

```json
{
  "...": "...",
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 63.32,
    "...": "..."
  },
  "...": "...",
}
```

### ToDo:
I'll add a terraform file in the future, and set up some Github Actions automate the CI/CD process, but for now this was just for some a friends website.