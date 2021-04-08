const csv = require('csvtojson')
const fs = require('fs')

const CSV_PATH = './data/input.csv'
const EVENTS_PATH = './data/events.json'
const POSS_CHARACTERS_PATH = '../public/possCharacters/'
const POSS_CHARACTERS_RES_PATH = './data/possCharactersImgs.json'
const SPLITER = ', '

const read = function(csvPath) {
  csv()
    .fromFile(csvPath)
    .then((rawEvents)=>{
      // console.log("read -> rawEvents", rawEvents)
      const events = rawEvents.map(evt => {
        return {
          id: evt.id,
          text: evt.text,
          tags: evt.tags.split(SPLITER),
          nextPossEvents: evt.nextPossEvents.split(SPLITER),
          nextPossEventsTags: evt.nextPossEventsTags.split(SPLITER),
        }
      })

      const str = JSON.stringify(events, null, 2)
      fs.writeFile(EVENTS_PATH, str, 'utf8', () => {
        console.log("write events done")
      });
    })
}

const getFilesListInFolder = function(folderPath) {
  var files = fs.readdirSync(folderPath);
  console.log("getFilesListInFolder -> files", files)
  const str = JSON.stringify(files, null, 2)
  fs.writeFile(POSS_CHARACTERS_RES_PATH, str, 'utf8', () => {
    console.log("write possCharacters done")
  });
}

read(CSV_PATH)
getFilesListInFolder(POSS_CHARACTERS_PATH)