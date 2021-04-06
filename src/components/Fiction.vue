<template>
  <div class="fiction">
    <div>
      {{fiction.activeCharacter.img}}
      <img v-bind:src="fiction.activeCharacter.img" />
    </div>
    <div>{{fiction.activeCharacter.activeEvent.text}}</div>
    <div><input type="button" v-click="nextScene" value="Next"/></div>
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
      fiction: null,
    }
  },
  created: function() {
    this.fiction = fc.generateFiction(this.props.charactersCount)
    console.log("🚀 ~ file: Fiction.vue ~ line 29 ~ this.fiction", this.fiction)
  },
  methods: {
    nextScene: function() {
      fc.nextScene(this.fiction)
    } 
  }
}
</script>