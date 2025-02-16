
import {
  contactMessage,
  githubMessage,
  linkedinMessage,
  portfolioMessage,
  resumeMessage,
  startMessage,
} from '../constants/messages.js';
import {
  byeSticker,
  helloSticker,
  okSticker,
} from '../constants/stickers.js';
import { bot } from '../index.js';
import { startGame } from './gameResponser.js';

export const denVikResponser = async (message) => {
  const text = message.text;
  const chatId = message.chat.id;
  console.log(text);
  try {
    switch (text) {
      case '/start':
        await bot.sendMessage(chatId, startMessage);
        return;
      case '/contact':
        await bot.sendMessage(chatId, contactMessage);
        return;
      case '/portfolio':
        await bot.sendMessage(chatId, portfolioMessage, {
          parse_mode: 'MarkdownV2',
        });
        return;
      case '/resume':
        await bot.sendMessage(chatId, resumeMessage, {
          parse_mode: 'MarkdownV2',
        });
        return;
      case '/linkedin':
        await bot.sendMessage(chatId, linkedinMessage, {
          parse_mode: 'MarkdownV2',
        });
        return;
      case '/github':
        await bot.sendMessage(chatId, githubMessage, {
          parse_mode: 'MarkdownV2',
        });
        return;
      case '/game':
        return startGame(chatId);
      default:
        if (['привіт', 'привет', 'hello', 'hi'].includes(text)) {
          await bot.sendSticker(chatId, helloSticker);
          return;
        }

        if (['пока', 'прощавай', 'goodbye', 'bye'].includes(text)) {
          await bot.sendSticker(chatId, byeSticker);
          return;
        }

        if (text === '?') {
          await bot.sendSticker(chatId, okSticker);
          await bot.sendMessage(chatId, startMessage);
          return;
        }

        if(!text){
          return;
        }

        return;
    }
  } catch (error) {
    if (error.response?.statusCode === 429) {
      const retryAfter = error.response.body.parameters.retry_after;
      console.log(
        `⚠️ Превышен лимит запросов! Ожидание ${retryAfter} секунд...`,
      );
      return await new Promise((resolve) =>
        setTimeout(resolve, retryAfter * 1000),
      );
    } else {
      console.error('❌ Something went wrong', error);
    }
  }
};
