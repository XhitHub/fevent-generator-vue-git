<template>
  <div class="character">
    <div>
      <div class="character-name">Char {{character.id}}</div>
      <img v-bind:src="IMG_ROOT + character.img" />
    </div>
    <div>{{character.activeEvent.text}}</div>
  </div>
</template>

<script>

export default {
  name: 'Character',
  props: {
    character: Object,
  },
}
</script>

<style scoped>

</style>