<template>
  <div class="fiction" @keydown.enter="nextScene">
    <div>
      <div>Char {{fiction.activeCharacter.id}}</div>
      <div>{{fiction.activeCharacter.img}}</div>
      <img2 v-bind:src="IMG_ROOT + fiction.activeCharacter.img" />
    </div>
    <div>{{fiction.activeCharacter.activeEvent.text}}</div>
    <div><input type="button" v-on:click="nextScene" value="Next"/></div>

    <div>
      <h4>Ended</h4>
      <div v-for="ic in inactiveCharacters" v-bind:key="ic.id">
        <div>Char {{ic.id}}</div>
        <div>{{ic.img}}</div>
        <img2 v-bind:src="IMG_ROOT + ic.img" />
        <div>{{ic.activeEvent.text}}</div>
      </div>
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

const fc = new FictionController()

export default {
  name: 'App',
  props: {
    charactersCount: Number,
  },
  data: function() {
    return {
      IMG_ROOT: './possCharacters/',
      fiction: null,
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
  },
  methods: {
    nextScene: function() {
      console.log("nextScene")
      fc.nextScene(this.fiction)
    } 
  }
}
</script>