const faker = require('faker');

for (let i = 0; i < 5000; i += 1) {
  const fakeWord = faker.random.word();
  if (fakeWord.indexOf(';') > -1) {
    console.log(fakeWord);
  }
}

for (let i = 0; i < 5000; i += 1) {
  const fakeWords = faker.random.words();
  if (fakeWords.indexOf(';') > -1) {
    console.log(fakeWords);
  }
}
