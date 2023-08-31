const { launch } = require('puppeteer');
const imgDownload = require('./imgDownload');

module.exports = async (userName) => {
     const BASE_INSTAGRAM_URL = "https://www.instagram.com/"
     console.log(`Searching and Downloading image from ${userName}....`)

     const browser = await launch({ headless: 'new' });
     const page = await browser.newPage();

     await page.goto(`${BASE_INSTAGRAM_URL}${userName}`, { waitUntil: 'networkidle2', timeout: 0 });
     // await page.screenshot({ path: 'example.jpg' });

     const imgSources = await page.evaluate(() => {
          function getWebFromListImages() {
               const listImageSources = Array.from(document.querySelectorAll('article a'))
               const listImageArray = listImageSources.map(i => `https://www.instagram.com/${i.getAttribute('href')}`);
               return listImageArray;
          }

          function getBigImages() {
               const bigImageSources = Array.from(document.querySelectorAll('article img'));
               const bigImageArray = bigImageSources.map(i => i.getAttribute('srcset'));
               return bigImageArray;
          }
          return { "bigImages": getBigImages(), "listImages": getWebFromListImages() };
     });
     const { bigImages, listImages } = imgSources
     await imgDownload(bigImages);

     for (const urlImages of listImages) {
          await page.goto(urlImages, { waitUntil: 'networkidle2', timeout: 0 });

          const imgList = await page.evaluate(() => {
               const imgSliderSource = Array.from(document.querySelectorAll('article img'));
               const imgSliders = imgSliderSource.map(i => i.getAttribute('srcset'));
               return imgSliders;

          });
          await imgDownload(imgList);
     }
     await browser.close();

     delete imgSources;

     console.log('Successfully downloaded');
     delete require.cache[require.resolve('./imgDownload.js')];

}