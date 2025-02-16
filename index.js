import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

import { commands } from './commands.js';
import { fake } from './fake.js';
import { weatherOptions } from './constants/options.js';

//responses
import { denVikResponser } from './responses/denVikResponser.js';
import { gameResponser } from './responses/gameResponser.js';
import { weatherResponser } from './responses/weatherResponser.js';

dotenv.config();

const TOKEN = process.env.TOKEN;
if (!TOKEN) {
  console.error('❌ BOT TOKEN is missing! Set it in the .env file.');
  process.exit(1);
}
export const bot = new TelegramBot(TOKEN, { polling: true });

bot.setMyCommands(commands);
bot.onText(/\/location/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Send your geolocation:', weatherOptions);
});

bot.on('message', denVikResponser);
bot.on('location', weatherResponser);
bot.on('callback_query', gameResponser);
fake();
