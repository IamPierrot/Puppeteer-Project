const fs = require('fs');
const getAllMedia = require('./src/getAllMedia.js');
const prompts = require('prompts');

(async () => {
     if (!fs.existsSync('./result')) fs.mkdirSync('./result');
     const question = await prompts({
          type: 'text',
          name: 'username',
          message: 'Please insert instagram username',
          validate: value => !value ? `Instagram username is required` : true
     });
    await getAllMedia(question.username);

}) ()