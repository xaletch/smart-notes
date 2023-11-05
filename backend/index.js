const TelegramBot = require('node-telegram-bot-api');

const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const fileUpload = require('express-fileupload');
const path = require('path');

const PORT = 8000;

app.get('/', (req, res) => {
    res.send('Home');
});

// UPLOAD IMG
app.use(fileUpload({
  createParentPath: true,
}));

app.use(cors());

app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(404).json({msg: 'Not file upload'});
  };

  const file = req.files.file;

  if (!file) return res.json({error: 'incorrect input name'});

  const newFileName = encodeURI(Date.now() + '-' + file.name);
  file.mv(`${__dirname}/../frontend/src/upload/${newFileName}`,
    err => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      };

      res.json({
        fileName: file.name,
        filePath: `../../../../upload${newFileName}`,
      });
    });
});

app.listen(PORT, (err) => {
  console.log('so far everything is working like clockwork');

  if (err) {
      console.log(err);
  };
});

const AppUrl = 'https://xaletch.github.io/frontend/';

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


// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   }),
// });
// let notesArray = [];
// app.post('/', upload.single('file'), (req, res) => {
//   const notes = JSON.parse(req.body.notes);

//   notesArray.push(notes);

//   res.send('NOTES SAVED');
// });
// app.get('/notes', (req, res) => {
//   res.send(notesArray);
// });