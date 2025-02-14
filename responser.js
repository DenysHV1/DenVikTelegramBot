import { bot } from './index.js';
import {
	game,
  github,
  linkedin,
  portfolio,
  resume,
  start,
} from './constants/messages.js';
import {
  byeSticker,
  errorSticker,
  helloSticker,
  okSticker,
} from './constants/stickers.js';
// import { gameOptions } from './constants/options.js';

// const chats = {}


// const startGame = async (chatId) => {
//     await bot.sendMessage(chatId, game);
//     const randomNumber = Math.floor(Math.random() * 10)
//     chats[chatId] = randomNumber;
//     await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
// }

export const denVikResponser = async (message) => {
	try {
		const text = message.text;
		const chatId = message.chat.id;
	  
		switch (text.toLowerCase()) {
		  case '/start':
			await bot.sendMessage(chatId, start);
			return;
		  case '/portfolio':
			await bot.sendMessage(chatId, portfolio);
			return;
		  case '/resume':
			await bot.sendMessage(chatId, resume);
			return;
		  case '/linkedin':
			await bot.sendMessage(chatId, linkedin);
			return;
		  case '/github':
			await bot.sendMessage(chatId, github);
			return;
		  // case '/game':
		  // 	return startGame(chatId);
		  case 'привіт' || 'привет' || 'hello' || 'hi':
			await bot.sendSticker(chatId, helloSticker);
			return;
		  case 'пока' || 'прощовай' || 'goodbye' || 'bye':
			await bot.sendSticker(chatId, byeSticker);
			return;
		  case '?':
			await bot.sendSticker(chatId, okSticker);
			await bot.sendMessage(chatId, start);
			return;
		  default:
			await bot.sendSticker(chatId, errorSticker);
			return;
		}
	} catch (error) {
		return bot.sendMessage(chatId, "Something went wrong!!!")
	}

};
