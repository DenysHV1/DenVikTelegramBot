import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

const TOKEN = process.env.TOKEN;
if (!TOKEN) {
  console.error('❌ BOT TOKEN is missing! Set it in the .env file.');
  process.exit(1);
}

export const bot = new TelegramBot(TOKEN, { polling: true });
