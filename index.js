import { bot } from './bot.js';
import { denVikResponser } from './responsers/denVikResponser.js';
import { commands } from './constants/commands.js';
import { gameResponser } from './responsers/gameResponser.js';

bot.setMyCommands(commands);
bot.on('message', denVikResponser);
bot.on('callback_query', gameResponser);
