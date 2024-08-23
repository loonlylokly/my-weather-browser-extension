import { GEO_API, WEATHER_API } from '@/src/shared/helpers/constants';

export async function getTemperature(cityName: string): Promise<string> {
  try {
    const locationResponse = await fetch(`${GEO_API}?name=${cityName}`);
    const locationData = await locationResponse.json();
    const { latitude, longitude } = locationData.results[0];

    const weatherResponse = await fetch(
      `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherResponse.json();
    return `${weatherData.current_weather.temperature}`;
  } catch (error) {
    console.error('Failed to retrieve weather data:', error);
    return `Failed to get temperature ${error} `;
  }
}
