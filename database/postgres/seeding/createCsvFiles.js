/* eslint-disable no-console */

const faker = require('faker');
const fs = require('fs');
const path = require('path');

const TARGET_PATH = '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data';
const RECORDS_PER_FILE = 1000000;
const FILE_COUNT = 10;

const tables = [
  {
    name: 'properties',
    header: 'average_rating,review_count,bed_count,house_type,nightly_price,image_name,image_description,image_url,host_id\n',
    recordTypes: [
      'average_rating',
      'review_count',
      'bed_count',
      'random.alpha',
      'nightly_price',
      'random.word',
      'random.words',
      'image_url',
      'id',
    ],
  },
  {
    name: 'nearby_properties',
    header: 'origin_property_id,nearby_property_id\n',
    recordTypes: [
      'id',
      'id',
    ],
  },
  {
    name: 'properties_lists',
    header: 'property_id,list_id\n',
    recordTypes: [
      'id',
      'id',
    ],
  },
  {
    name: 'lists',
    header: 'name,image_url,user_id\n',
    recordTypes: [
      'random.word',
      'image_url',
      'id',
    ],
  },
  {
    name: 'users',
    header: 'name,email,password,role,is_superhost\n',
    recordTypes: [
      'name.findName',
      'internet.email',
      'internet.password',
      'random.alpha',
      'random.boolean',
    ],
  },
];

let dirName = '';

const createDir = () => {
  const fileCount = fs.readdirSync(TARGET_PATH).length;
  let takenName = fileCount > 0 && fs.readdirSync(TARGET_PATH)[fileCount - 1].match(/^(.*[^\d]\d+)$/)
    ? fs.readdirSync(TARGET_PATH)[fileCount - 1].match(/^(.*[^\d]\d+)$/)[1]
    : 'R0';
  const prevNameStem = takenName.match(/^(.+)\d+$/)[1];
  let availableNameNotFound = true;
  while (availableNameNotFound) {
    const nextNameNumber = Number(takenName.match(/^.*[^\d](\d+)$/)[1]) + 1;
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

const writeCsvFile = (targetPath, directory, filename, header, callback) => {
  const filepath = path.join(targetPath, directory, filename);
  const csvFileWriter = fs.createWriteStream(filepath);
  csvFileWriter.write(header, 'utf8', callback);
  return csvFileWriter;
};

const getRandom = {
  imgUrl() {
    const imgNumber = Math.ceil(Math.random() * 1000);
    return `https://imgazou.s3-us-west-1.amazonaws.com/img1/img-${imgNumber}.jpg`;
  },
  avgRating() {
    return (Math.random() * 5).toFixed(2);
  },
  reviewCount() {
    return Math.ceil(Math.random() * 500);
  },
  bedCount() {
    return Math.ceil(Math.random() * 5);
  },
  nightlyPrice() {
    return (Math.random() * 1000).toFixed(2);
  },
  id() {
    return Math.ceil(Math.random() * 10000000);
  },
};

const status = {
  filesWritten: 0,
  tablesWritten: 0,
};

const writeRecords = (
  fileWriter,
  recordCount,
  recordTypes,
  filename,
) => {
  let recordsWritten = 0;
  const writeFile = () => {
    let ableToContinue = true;
    while (recordsWritten <= recordCount && ableToContinue) {
      recordsWritten += 1;
      let record = '';
      recordTypes.forEach((type) => {
        let data;
        if (type === 'image_url') {
          data = getRandom.imgUrl();
        } else if (type === 'average_rating') {
          data = getRandom.avgRating();
        } else if (type === 'review_count') {
          data = getRandom.reviewCount();
        } else if (type === 'bed_count') {
          data = getRandom.bedCount();
        } else if (type === 'nightly_price') {
          data = getRandom.nightlyPrice();
        } else if (type === 'id') {
          data = getRandom.id();
        } else if (type.indexOf('.') > -1) {
          const category = type.match(/^(\w+)\.\w+$/)[1];
          const subCategory = type.match(/^\w+\.(\w+)$/)[1];
          data = faker[category][subCategory]();
        } else {
          data = faker[type]();
        }
        record += `${data},`;
      });
      record = `${record.slice(0, record.length - 1)}\n`;
      if (recordsWritten % 50000 === 0) {
        console.log(`${recordsWritten} records written to ${filename}`);
      }
      if (recordsWritten < recordCount) {
        ableToContinue = fileWriter.write(record, 'utf-8');
      } else if (recordsWritten === recordCount) {
        console.log(`${filename} COMPLETE`);
        fileWriter.write(record, 'utf-8', () => {
          fileWriter.end();
          handleNextAction();
        });
      }
    }
    if (recordsWritten < recordCount) {
      fileWriter.once('drain', writeFile);
    }
  };
  writeFile();
};

const createCsvFile = ({
  name,
  header,
  recordTypes,
}) => {
  const filename = `${name}${status.filesWritten}.csv`;
  const writeSpecificCsvFile = writeCsvFile(
    TARGET_PATH,
    dirName,
    filename,
    header,
  );
  writeRecords(
    writeSpecificCsvFile,
    RECORDS_PER_FILE,
    recordTypes,
    filename,
  );
};

const handleNextAction = () => {
  status.filesWritten += 1;
  if (status.filesWritten >= FILE_COUNT) {
    status.tablesWritten += 1;
    status.filesWritten = 0;
  }
  if (status.tablesWritten < tables.length) {
    createCsvFile(tables[status.tablesWritten]);
  }
};

createDir();

createCsvFile(tables[status.tablesWritten]);
