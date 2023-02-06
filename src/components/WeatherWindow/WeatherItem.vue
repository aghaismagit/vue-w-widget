<template>
  <div class="item-wrapper">
    <h2 class="city-name">{{ model.name }}, {{ model.country }}</h2>
    <div class="main-info">
      <div class="item-image-wrapper">
        <img
          :src="`https://openweathermap.org/img/wn/${model.weather.icon}@2x.png`"
          alt="weather"
        />
      </div>
      <h3>{{ model.temp }}&#8451;</h3>
    </div>
    <h2 class="main-info__description">
      {{ model.feels }}&#8451; <br/>
      {{ model.weather.description }}
    </h2>
    <ul class="extension-info">
      <li>{{ model.humidity }}</li>
      <li>{{ model.wind }}</li>
      <li>{{ model.visibility }}</li>
    </ul>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    model: {
      required: true,
      type: Object
    },
  },
})
</script>

<style lang="scss" scoped>
.main-info {
  display: flex;
  justify-content: space-around;
  align-items: center;

  font-size: 25px;
  margin: 30px 0;
}

.main-info-img {
  width: 100px;
}

.item-image-wrapper {
  width: 100px;
  height: 100px;
}

.main-info__description {
  text-align: center;
  font-size: 25px;
  margin-bottom: 40px;
}

.extension-info {
  font-size: 18px;
  padding-bottom: 32px;
}

.city-name {
  overflow-wrap: break-word;
  padding-right: 60px;
}
</style>
