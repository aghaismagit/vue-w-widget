<template>
  <div>
    <h3 class="empty-data" v-if="model.length < 1">City not selected. Please select the city</h3>
    <ul class="weather-list">
      <li v-for="points in model" :key="points.name">
        <weather-item :model="points"/>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import WeatherItem from './WeatherItem.vue'
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    model: {
      required: true,
    }
  },
  components: {
    WeatherItem
  }
})
</script>


<style lang="scss" scoped>
.empty-data {
  text-align: center;
  padding-top: 100px;
}


</style>
