const TelegramBot = require('node-telegram-bot-api');

const AppUrl = 'https://www.twitch.tv/'

const token = '6361296205:AAEhdzgUuuEYlfLsWyLkKhN5ct3wO4yth2w';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const username = msg.from.first_name;

  if (text === '/start') {
    await bot.sendMessage(chatId, `${username}, привет! Здесь ты сможешь создавать и управлять своими планами на ближайший день, неделю, месяц и год.`, {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Создать распорядок дня', web_app: {url: AppUrl}}]
            ]
        }
    })
  };
});