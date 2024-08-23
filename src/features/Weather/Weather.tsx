import { useEffect, useRef, useState } from 'react';

import { getTemperature } from '@/src/shared/api/weatherApi';
import { useEventListener } from '@/src/shared/hooks/useEventListener';
import WeatherIcon from '@/src/shared/ui/icons/WeatherIcon';

export function Weather() {
  const [cityName, setCityName] = useState<string>('Moscow');
  const [temperature, setTemperature] = useState<string>(' loading... ');
  const refWeather = useRef<HTMLDivElement | null>(null);
  const refButton = useRef<HTMLButtonElement | null>(null);

  useEventListener(
    'blur',
    () => {
      refWeather.current?.classList.toggle('open');
    },
    refButton
  );

  useEffect(() => {
    chrome.storage.local.get(['cityName', 'temperature']).then((data) => {
      setTemperature(data.temperature || ' loading... ');
      setCityName(data.cityName || 'Moscow');
    });
  });

  const handleClick = async () => {
    if (!refWeather.current?.classList.contains('open')) {
      refWeather.current?.classList.toggle('open');
      const data = await chrome.storage.local.get(['cityName', 'temperature']);
      const temp = await getTemperature(data.cityName || cityName);
      setTemperature(temp);
      setCityName(data.cityName);
      chrome.storage.local.set({ cityName: data.cityName, temperature: temp });
    } else {
      refButton.current?.blur();
    }
  };

  return (
    <div className='weather_wrap'>
      <button className='weather_btn' onClick={handleClick} ref={refButton}>
        <WeatherIcon />
      </button>
      <div className='anchorWeather' ref={refWeather}>
        The current temperature in {cityName} is {temperature}°C.
      </div>
    </div>
  );
}
