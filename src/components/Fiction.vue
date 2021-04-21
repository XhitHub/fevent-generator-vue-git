<template>
  <div class="fiction" @keydown.enter="nextScene">
    <Character :character="fiction.activeCharacter"></Character>

    <div class="div-ended">
      <h4>Ended</h4>
      <div v-for="ic in inactiveCharacters" v-bind:key="ic.id">
        <Character :character="ic"></Character>
      </div>
    </div>

    <div class="control-btns">
      <input class="btn btn-primary mr-4" type="button" v-on:click="nextScene" value="Next"/>
      <input type="checkbox" v-model="autoplay" /> Autoplay - <input type="number" v-model="autoplayInterval" /> seconds
    </div>

    <div v-if="debug">
      <h4>debug</h4>
      <div>{{JSON.stringify(fiction.activeCharacter.activeEvent)}}</div>
      <div>{{JSON.stringify(fiction.characters, null, 2)}}</div>
    </div>
  </div>
</template>

<script>
import FictionController from '../FictionController.js'
import Character from './Character.vue'

const fc = new FictionController()

export default {
  name: 'Fiction',
  props: {
    charactersCount: Number,
  },
  components: {
    Character
  },
  data: function() {
    return {
      IMG_ROOT: './possCharacters/',
      fiction: null,
      autoplay: false,
      autoplayInterval: 4,
      debug: false,
    }
  },
  computed: {
    inactiveCharacters: function() {
      return this.fiction.characters.filter(c => c.status==0)
    },
  },
  created: function() {
    this.fiction = fc.generateFiction(2)
    console.log("🚀 ~ file: Fiction.vue ~ line 29 ~ this.fiction", this.fiction)
  },
  mounted: function() {
    document.addEventListener('keyup', (evt) => {
      console.log("evt.keyCode", evt.keyCode)
      if (evt.keyCode == 32) {
        this.nextScene()
      }
    });
    setInterval(() => {
      if (this.autoplay) {
        this.nextScene()
      }
    }, this.autoplayInterval * 1000)
  },
  methods: {
    nextScene: function() {
      console.log("nextScene")
      fc.nextScene(this.fiction)
    } 
  }
}
</script>

<style scoped>

.div-ended {
  border-top: 1px dotted #DDD;
  margin: 10px 10px;
  padding: 10px 0px;
}

.control-btns {
  position: fixed;
  bottom: 10px;
  text-align: center;
  width: 100%;
}
</style>