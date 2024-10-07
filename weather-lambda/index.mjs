import axios from './node_modules/axios/index.js';

export const handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event));

    const getLocation = async (ipAddress) => {
        const url = `http://ip-api.com/json/${ipAddress}`
        const request = await axios.get(url);
        
        console.log(`Location: ${JSON.stringify(request.data)}`)
        return {lat: request.data.lat, lon: request.data.lon}
    }
    
    const getWeather = async (coords) => {
        console.log("Getting weather...")
        
        const apiKey = '2c25a32993d8e49a97149a135623fd1c'
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=${apiKey}`
        console.log(url)
        const request = await axios.get(url)
        
        return request.data
    }
    
    try {
        let coords = getLocation(event.ip);
        let weather = getWeather(await coords);
        

        return ({ ...event, ...await weather })
    } catch (err) {
        console.log(err)
        return JSON.stringify(err)
    }
};
