<template>
  <div class="fiction">
    <div>
      <div>{{fiction.activeCharacter.img}}</div>
      <img2 v-bind:src="IMG_ROOT + fiction.activeCharacter.img" />
    </div>
    <div>{{fiction.activeCharacter.activeEvent.text}}</div>
    <div>{{JSON.stringify(fiction.activeCharacter.activeEvent)}}</div>
    <div><input type="button" v-on:click="nextScene" value="Next"/></div>
    <h4>debug</h4>
    <div>{{JSON.stringify(fiction.characters, null, 2)}}</div>
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
    }
  },
  created: function() {
    this.fiction = fc.generateFiction(2)
    console.log("🚀 ~ file: Fiction.vue ~ line 29 ~ this.fiction", this.fiction)
  },
  methods: {
    nextScene: function() {
      console.log("nextScene")
      fc.nextScene(this.fiction)
    } 
  }
}
</script>