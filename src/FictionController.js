const myEvents = require('./data/events.json')
const possCharactersImgs = require('./data/possCharactersImgs.json')

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
//   nextEvent: null,
// }



class FictionController {
  constructor() {
    this.events = []
    this.possCharacterImgs = []
    this.init()
  }

  init() {
    console.log("FictionController -> init -> myEvents", myEvents)
    this.events = myEvents
    this.possCharacterImgs = possCharactersImgs
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
      res.characters.push(this.generateCharacter(i+1))
    }
    res.activeCharacter = this.randomItem(res.characters)
    return res
  }

  generateCharacter(id) {
    let character = {
      id: id,
      img: this.randomItem(this.possCharacterImgs),
      story: this.generateCharacterStory(),
      status: 1,
    }
    console.log("FictionController -> generateCharacter -> character", character)
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
    while(currEvent && !currEvent.tags.includes(END_EVENT_TAG)) {
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
      currEvent['nextEvent'] = nextEvent
      story.push(currEvent)
      currEvent = nextEvent
    }
    return story
  }

  nextScene(fiction) {
    if (fiction.activeCharacter.activeEvent.nextEvent != undefined) {
      fiction.activeCharacter.activeEvent = fiction.activeCharacter.activeEvent.nextEvent
    } else {
      fiction.activeCharacter.status = 0
    }
    // // chars with active scene
    // let activeChars = fiction.characters.filter(c => c.activeEvent != undefined)
    // chars with status 1
    let activeChars = fiction.characters.filter(c => c.status == 1)
    if (activeChars.length > 0) {
      // only switch if there exist still active chars
      fiction.activeCharacter = this.randomItem(activeChars)
    }
  }
}

export default FictionController
