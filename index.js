import { bot } from './bot.js';
import { denVikResponser } from './responsers/denVikResponser.js';
import { commands } from './constants/commands.js';
import { gameResponser } from './responsers/gameResponser.js';

bot.setMyCommands(commands);
bot.on('message', denVikResponser);
bot.on('callback_query', gameResponser);


//Fake
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
