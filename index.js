import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { denVikResponser } from './responser.js';
import { commands } from './constants/commands.js';

dotenv.config();

const TOKEN = process.env.TOKEN;
export const bot = new TelegramBot(TOKEN, { polling: true });

bot.setMyCommands(commands);

bot.on('message', denVikResponser);
