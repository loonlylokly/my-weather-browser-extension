// import logo from '@/assets/img/logo.svg';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { getTemperature } from '@/src/shared/api/weatherApi';
import { cities } from '@/src/shared/helpers/constants';
import withErrorBoundary from '@/src/shared/hoc/withErrorBoundary';
import withSuspense from '@/src/shared/hoc/withSuspense';

import styles from './Popup.module.css';

const Popup = () => {
  const [cityName, setCityName] = useState<string>('Moscow');
  const [temperature, setTemperature] = useState<string>(' loading... ');

  useEffect(() => {
    chrome.storage.local.get(['cityName', 'temperature']).then((data) => {
      setTemperature(data.temperature);
      setCityName(data.cityName);
    });
  });

  const handleChangeCity = async (e: ChangeEvent<HTMLSelectElement>) => {
    const temp = await getTemperature(e.target.value);
    setCityName(e.target.value);
    setTemperature(temp);
    chrome.storage.local.set({ cityName: e.target.value, temperature: temp });
  };

  return (
    <div className={styles.popup}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Weather Extension</h1>
        <div className={styles.select_wrap}>
          <select
            key={cityName}
            className={styles.select}
            defaultValue={cityName}
            onChange={handleChangeCity}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <div className={styles.temperature}>Температура: {temperature} °C</div>
        </div>
      </header>
    </div>
  );
};

export default withErrorBoundary(
  withSuspense(Popup, <div> Loading ... </div>),
  <div> Error Occur </div>
);
