import { gameOptions, restartOptions } from '../constants/gameOptions.js';
import { noSticker, winnerSticker } from '../constants/stickers.js';
import { bot } from '../index.js';
import { gameMessage } from '../constants/messages.js';
const chats = {};

export const startGame = async (chatId) => {
  await bot.sendMessage(chatId, gameMessage);
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'Guess', gameOptions);
};

export const gameResponser = (msg) => {
  try {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === '/restart') {
      return startGame(chatId);
    }

    if (Number(data) === Number(chats[chatId])) {
      bot.sendSticker(chatId, winnerSticker);
      return bot.sendMessage(
        chatId,
        `Congratulations, you guessed the number ${data}`,
        restartOptions,
      );
    } else {
      bot.sendSticker(chatId, noSticker);
      return bot.sendMessage(
        chatId,
        `You didn't guess. Your number ${data}`,
        restartOptions,
      );
    }
  } catch (error) {
    return bot.sendMessage(chatId, 'Something went wrong!!!');
  }
};
