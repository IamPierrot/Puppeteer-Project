const imgDownloader = require('image-downloader');
const path = require('path');

module.exports = async (listUrl) => {
     try {
          return listUrl.forEach(urls => {
               if (!urls) return;

               const urlArray = urls.split(',');
               urlArray.forEach((url) => {
                    imgDownloader.image({
                         url: url,
                         dest: path.join(__dirname, '..', 'result')
                    })
               })
          });

     } catch (error) {
          console.log('There was an error: ', error);
     }

}