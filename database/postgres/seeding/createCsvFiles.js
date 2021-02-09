/* eslint-disable no-console */

const faker = require('faker');
const fs = require('fs');
const path = require('path');
const filePaths = require('./filePaths.js');

const TARGET_PATH = filePaths.csvs;
const PRERATIO_RECORDS_PER_FILE = 100000;
const FILE_COUNT = 10;

const tables = [
  {
    name: 'properties',
    header: 'average_rating;review_count;bed_count;house_type;nightly_price;image_name;image_description;image_url;host_id\n',
    recordTypes: [
      'average_rating',
      'review_count',
      'bed_count',
      'random.alpha',
      'nightly_price',
      'random.word',
      'random.words',
      'image_url',
      'id_users',
    ],
    recordCountRatio: 10,
  },
  {
    name: 'nearby_properties',
    header: 'origin_property_id;nearby_property_id\n',
    recordTypes: [
      'id_properties',
      'id_properties',
    ],
    recordCountRatio: 50,
  },
  {
    name: 'users',
    header: 'name;email;password;role;is_superhost\n',
    recordTypes: [
      'name.findName',
      'internet.email',
      'internet.password',
      'role',
      'random.boolean',
    ],
    recordCountRatio: 1,
  },
  // {
  //   name: 'lists',
  //   header: 'name;image_url;user_id\n',
  //   recordTypes: [
  //     'random.word',
  //     'image_url',
  //     'id_users',
  //   ],
  //   recordCountRatio: 5,
  // },
  // {
  //   name: 'properties_lists',
  //   header: 'property_id;list_id\n',
  //   recordTypes: [
  //     'id_properties',
  //     'id_lists',
  //   ],
  //   recordCountRatio: 15,
  // },
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
  role() {
    const roles = ['free', 'guest', 'host', 'staff', 'admin', 'superadmin'];
    const index = Math.floor(Math.random() * roles.length);
    return roles[index];
  },
  id(tableName) {
    let tableIndex;
    for (let i = 0; i < tables.length; i += 1) {
      if (tables[i].name === tableName) {
        tableIndex = i;
        break;
      }
    }
    const maxId = PRERATIO_RECORDS_PER_FILE * FILE_COUNT * tables[tableIndex].recordCountRatio;
    return Math.ceil(Math.random() * maxId);
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
        } else if (type === 'role') {
          data = getRandom.role();
        } else if (type.match(/^id_\w+$/)) {
          const idType = type.match(/^id_(\w+)$/)[1];
          data = getRandom.id(idType);
        } else if (type.indexOf('.') > -1) {
          const category = type.match(/^(\w+)\.\w+$/)[1];
          const subCategory = type.match(/^\w+\.(\w+)$/)[1];
          data = faker[category][subCategory]();
        } else {
          data = faker[type]();
        }
        record += `${data};`;
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
  recordCountRatio,
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
    (PRERATIO_RECORDS_PER_FILE * recordCountRatio),
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
