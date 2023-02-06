<template>
  <li class="settings-item__wrapper">
    <div class="settings-item">
      <p class="city-name">{{ model.name }},{{ model.country }}</p>
      <span class="burger"/>
      <img
        class="settings-item__image"
        @click="removeCity"
        src="../../assets/img/basket.png"
        alt=""
      />
    </div>
  </li>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    model: {
      type: Object,
    },
  },
  methods: {
    removeCity() {
      this.$emit("delete", this.model);
    },
  },
})
</script>


<style lang="scss" scoped>
@import "src/assets/styles/styles";

.settings-item__wrapper {
  cursor: pointer;
}

.burger::before,
.burger::after,
.burger {
  position: absolute;
  width: 20px;
  height: 3px;
  background-color: black;
  transition: 0.4s;
}

.burger {
  left: 12%;
}

.burger::before {
  content: "";
  top: -5px;
}

.burger::after {
  content: "";
  top: 5px;
}

.settings-item {
  display: flex;
  align-items: center;

  background-color: var(--light_gray);
  border-radius: 15px;
  border: 1px solid var(--black);

  max-width: 250px;
  height: 40px;

  margin: 10px auto;
  padding: 0 40px;
}

.city-name {
  overflow-wrap: break-word;
}

.settings-item__image {
  position: absolute;
  right: 12%;
}
</style>
