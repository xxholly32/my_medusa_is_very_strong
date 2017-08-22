<template>
  <div class="fill page">
    <v-header></v-header>
    <v-menu></v-menu>
    <div class="content-container">
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
import vHeader from '../components/header.vue'
import vMenu from '../components/menu.vue'

export default {
  components: {
    vHeader,
    vMenu
  }
}
</script>
