import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { denVikResponser } from './responsers/denVikResponser.js';
import { commands } from './constants/commands.js';
import { gameResponser } from './responsers/gameResponser.js';

dotenv.config();

const TOKEN = process.env.TOKEN;
export const bot = new TelegramBot(TOKEN, { polling: true });

bot.setMyCommands(commands);

bot.on('message', denVikResponser);
bot.on('callback_query', gameResponser);
