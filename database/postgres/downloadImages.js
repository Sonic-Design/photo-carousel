const fs = require('fs');
const path = require('path');
const axios = require('axios');

const IMAGES_TO_DOWNLOAD = 1000;
const TARGET_PATH = '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/lorem-flickr-images';

let dirName = '';

const createDir = () => {
  const fileCount = fs.readdirSync(TARGET_PATH).length;
  let takenName = fs.readdirSync(TARGET_PATH)[fileCount - 1].match(/^(.+\d+)$/)
    ? fs.readdirSync(TARGET_PATH)[fileCount - 1].match(/^(.+\d+)$/)[1]
    : 'R0';
  const prevNameStem = takenName.match(/^(.+)\d+$/)[1];
  let availableNameNotFound = true;
  while (availableNameNotFound) {
    const nextNameNumber = Number(takenName.match(/^.+(\d+)$/)[1]) + 1;
    const nextNameToTry = prevNameStem + nextNameNumber;
    const nextNameWithPath = path.join(TARGET_PATH, nextNameToTry);
    if (fs.existsSync(nextNameWithPath)) {
      takenName = nextNameToTry;
    } else {
      availableNameNotFound = false;
      fs.mkdirSync(nextNameWithPath);
      dirName = nextNameToTry;
    }
  }
};

let downloadCount = 1;

const downloadImages = () => {
  axios({
    url: 'https://loremflickr.com/270/180/house',
    method: 'get',
    responseType: 'stream',
  })
    .then((res) => {
      res.data.pipe(fs.createWriteStream(path.join(TARGET_PATH, dirName, `img-${downloadCount}.jpg`)));
      if (downloadCount % 10 === 0) {
        console.log(`Images downloaded: ${downloadCount}`);
      }
      downloadCount += 1;
      if (downloadCount <= IMAGES_TO_DOWNLOAD) {
        downloadImages();
      } else {
        setTimeout(() => {
          console.log(`\nDownload complete! ${downloadCount - 1} images successfully downloaded\n`);
          process.exit(0);
        }, 500);
      }
    })
    .catch(console.error);
};

createDir();
downloadImages();
