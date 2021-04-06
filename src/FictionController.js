const csv = require('csvtojson')
// import csv from 'csvtojson'
// const fs = require('fs');
// import { readdirSync } from 'fs';

const CSV_PATH = './data/input.csv'
const POSS_CHARACTERS_IMGS_PATH = './assets/poss_characters/'
const SPLITER = ', '
const INITIAL_EVENT_TAG = 'init'
const END_EVENT_TAG = 'end'

// samples obj
// const sampleFiction = {
//   characters: [],
//   activeCharacter: null,
// }
// const sampleCharacter = {
//   id: '1',
//   img: 'asd.jpg',
//   story: [],
//   activeEvent: null,
//   status: 1,
// }
// const sampleEvent = {
//   id: 'e1',
//   text: 'text1',
//   tags: ['tag1'],
//   nextPossEvents: [],
//   nextPossEventsTags: ['tag2', 'tag3'],
//   next: null,
// }



class FictionController {
  constructor() {
    this.events = []
    this.possCharacterImgs = []
    this.init()
  }

  init() {
    csv()
      .fromFile(CSV_PATH)
      .then((rawEvents)=>{
        this.events = rawEvents.map(evt => {
          return {
            id: evt.id,
            text: evt.text,
            tags: evt.tags.split(SPLITER),
            nextPossEvents: evt.nextPossEvents.split(SPLITER),
            nextPossEventsTags: evt.nextPossEventsTags.split(SPLITER),
          }
        })
      })
    // let files = fs.readdirSync(POSS_CHARACTERS_IMGS_PATH);
    // let files = readdirSync(POSS_CHARACTERS_IMGS_PATH); 
    let files = [POSS_CHARACTERS_IMGS_PATH]
    this.possCharacterImgs = files
  }

  randomItem(arr) {
    let i = Math.floor(Math.random() * arr.length)
    return arr[i]
  }

  getEventById(id) {
    return this.events.find(evt => evt.id == id)
  }

  getEventsByTag(tag) {
    return this.events.filter(evt => evt.tags.includes(tag))
  }

  generateFiction(charactersCount) {
    let res = {
      characters: []
    }
    for (let i = 0; i<charactersCount; i++){
      res.characters.push(this.generateCharacter())
    }
    res.activeCharacter = this.randomItem(res.characters)
    return res
  }

  generateCharacter() {
    let character = {
      img: this.randomItem(this.possCharacterImgs),
      story: this.generateCharacterStory()
    }
    character.activeEvent = character.story[0]
    return character
  }

  generateCharacterStory() {
    let possInitialEvents = this.getEventsByTag(INITIAL_EVENT_TAG)
    let startEvent = this.randomItem(possInitialEvents)
    // story is list of events
    let story = []
    var currEvent = startEvent
    story.push(currEvent)
    while(!currEvent.tags.includes(END_EVENT_TAG)) {
      // set next currEvent
      let possNextEvents = []
      currEvent.nextPossEvents.forEach(evtId => {
        possNextEvents.push(this.getEventById(evtId))
      })
      currEvent.nextPossEventsTags.forEach(tag => {
        possNextEvents = possNextEvents.concat(this.getEventsByTag(tag))
      })
      if (possNextEvents.length == 0) {
        break
      }
      let nextEvent = this.randomItem(possNextEvents)
      currEvent.next = nextEvent
      currEvent = nextEvent
      story.push(currEvent)
    }
    return story
  }

  nextScene(fiction) {
    fiction.activeCharacter.activeEvent = fiction.activeCharacter.activeEvent.nextEvent
    fiction.activeCharacter = this.randomItem(fiction.characters)
  }
}

export default FictionController
