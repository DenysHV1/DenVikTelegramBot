import axios from 'axios';
import { bot } from '../index.js';


export const weatherResponser = async (msg) => {
  try {
	const chatId = msg.chat.id
	const { latitude, longitude } = msg.location;

    const params = {
      latitude: latitude,
      longitude: longitude,
      hourly: 'temperature_2m',
      forecast_days: 1,
    };
    const url = `https://api.open-meteo.com/v1`;

    if (latitude && longitude) {
      const response = await axios.get(`${url}/forecast`, { params });

      const { time, temperature_2m } = response.data.hourly;
      const data = temperature_2m.map((item, idx) => {
        return { temp: `${item}°C`, time: time[idx].slice(11, 16) };
      });
	  console.log(data);
	  const message = data.map(({temp, time}) => `⌚*Time:* ${time}, 🌡*Temperature:* ${temp}\n`).join('\n')
	  console.log(message);
	  
	  return await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' })
    }
  } catch (error) {
	if (error.response?.statusCode === 429) {
		const retryAfter = error.response.body.parameters.retry_after;
		console.log(`⚠️ Превышен лимит запросов! Ожидание ${retryAfter} секунд...`);
		return await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
	} else {
		console.error("❌ Something went wrong", error);
	}
  }
};
